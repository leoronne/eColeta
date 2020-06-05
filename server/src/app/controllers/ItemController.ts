import { Request, Response } from 'express';
import knex from '../../database/connection';

require('dotenv/config');

class ItemController {
  async index(req: Request, res: Response) {
    try {
      const items = await knex('items').select('*');

      const serializedItems = items.map((item) => {
        return {
          id: item.id,
          title: item.title,
          image_url: `${process.env.APP_URL}uploads/${item.image}`,
          image: item.image,
        };
      });

      return res.status(200).json(serializedItems);
    } catch (err) {
      const message = err.message;
      return res.status(500).json(message);
    }
  }
}

export default ItemController;
