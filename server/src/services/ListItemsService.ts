import { Request, Response } from 'express';
import knex from '../database/connection';

import { APP_URL } from '../common/constants'

class ListItemsService {
  async run(req: Request, res: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${APP_URL}/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }
}

export default new ListItemsService();
