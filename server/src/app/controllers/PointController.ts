import { Request, Response } from 'express';
import knex from '../../database/connection';

require('dotenv/config');

class PointController {
  async index(req: Request, res: Response) {
    try {
      const { city, uf, items } = req.query;

      const parsedItems = items
        ? String(items)
            .split(',')
            .map((item) => Number(item.trim()))
        : [];

      const ufWhere = uf ? ` AND "uf"='${uf}'` : '';
      const cityWhere = city ? ` AND "city" LIKE '%${city}%'` : '';
      const itemsWhere = parsedItems.length > 0 ? ` AND "point_items"."item_id" IN (${parsedItems})` : '';
      const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereRaw(`1=1${ufWhere}${cityWhere}${itemsWhere}`)
        .distinct()
        .select('points.*');

      if (points.length === 0) {
        return res.status(404).json({ message: 'No points found!' });
      }


      const pointsOrganized = new Array();
      points.map(async function (point) {
        pointsOrganized.push({
          id: point.id,
          image: point.image,
          name: point.name,
          email: point.email,
          whatsapp: point.whatsapp,
          latitude: parseFloat(point.latitude),
          longitude: parseFloat(point.longitude),
          city: point.city,
          uf: point.uf
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
      const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body;

      const trx = await knex.transaction();

      const ids = await trx('points').insert(
        {
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          city,
          uf,
          image: 'https://images.unsplash.com/photo-1555488205-d5e67846cf40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
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
      return res.status(204).send();
    } catch (err) {
      const message = err.message;
      return res.status(500).json(message);
    }
  }
}

export default PointController;
