import { Request, Response } from 'express';
import knex from '../database/connection';

import { APP_URL } from '../common/constants';
class ShowPointService {
  async run(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point) return res.status(400).json({ message: 'Point not found.' });

    const serializedPoint = {
      ...point,
      image_url: `${APP_URL}/uploads/${point.image}`
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return res.json({ point: serializedPoint, items });
  }
}

export default new ShowPointService();
