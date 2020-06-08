import { Request, Response } from 'express';
import knex from '../../database/connection';

require('dotenv/config');

class PointController {
  async index(req: Request, res: Response) {
    try {
      const { compound, address, items } = req.query;
      const parsedItems = items
        ? String(items)
            .split(',')
            .map((item) => Number(item.trim()))
        : [];
      const addressWhere = address ? ` AND "address" LIKE '%${address}%'` : '';
      const compoundWhere = compound ? ` AND "compound" LIKE '%${compound}%'` : '';
      const itemsWhere = parsedItems.length > 0 ? ` AND "point_items"."item_id" IN (${parsedItems})` : '';
      const points = await knex('points_with_itens')
        .join('point_items', 'points_with_itens.point_id', '=', 'point_items.point_id')
        .whereRaw(`1=1${addressWhere}${compoundWhere}${itemsWhere}`)
        .distinct()
        .select('points_with_itens.*');

      if (points.length === 0) {
        return res.status(404).json({ message: 'No points found!' });
      }

      const Items = await knex('items').select('*');

      const serializedItems = Items.map((item) => {
        return {
          id: item.id,
          title: item.title,
          image_url: `${process.env.APP_URL}uploads/${item.image}`,
          image: item.image,
        };
      });

      const pointsOrganized = new Array();
      points.map(async function (point) {
        pointsOrganized.push({
          id: point.point_id,
          name: point.name,
          email: point.email,
          whatsapp: point.whatsapp,
          latitude: parseFloat(point.latitude),
          longitude: parseFloat(point.longitude),
          compound: point.compound,
          address: point.address,
          image: point.image,
          items: point.itens.split(',').map(Number),
        });
      });

      return res.status(200).json(pointsOrganized);
    } catch (err) {
      const message = err.message;
      return res.status(500).json(message);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const point = await knex('points').where('id', id).first();

      if (!point) {
        return res.status(404).json({ message: 'Point not found!' });
      }

      point.latitude = parseFloat(point.latitude);
      point.longitude = parseFloat(point.longitude);

      const items = await knex('items').join('point_items', 'items.id', '=', 'point_items.item_id').where('point_items.point_id', id);
      const serializedItems = items.map((item) => {
        return {
          id: item.item_id,
          title: item.title,
          image_url: `${process.env.APP_URL}uploads/${item.image}`,
          image: item.image,
        };
      });

      return res.status(200).json({ ...point, serializedItems });
    } catch (err) {
      const message = err.message;
      return res.status(500).json(message);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, email, whatsapp, latitude, longitude, address, compound, items } = req.body;

      const trx = await knex.transaction();

      const ids = await trx('points').insert(
        {
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          address,
          compound,
          image: '',
        },
        'id'
      );

      const pointItems = items.map((item_id: number) => {
        return {
          point_id: ids[0],
          item_id,
        };
      });

      await trx('point_items').insert(pointItems);
      await trx.commit();
      return res.status(200).send({ id: ids[0] });
    } catch (err) {
      const message = err.message;
      return res.status(500).json(message);
    }
  }

  async uploadPhoto(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { originalname: name, size, key, location: url = '' } = req.file;

      const point = await knex('points').where('id', id).first();

      if (!point) {
        return res.status(404).json({ message: 'Point not found!' });
      }

      await knex('points')
        .where('id', id)
        .update({
          image: url ? url : `${process.env.APP_URL}uploads/${key}`,
        });

      return res.status(204).send();
    } catch (err) {
      const message = err.message;
      return res.status(500).json(message);
    }
  }
}

export default PointController;
