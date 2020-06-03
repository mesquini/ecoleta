import { Request, Response } from 'express';
import knex from '../database/connection';

class ShowPointService {
  async run(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point) return res.status(400).json({ message: 'Point not found.' });

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return res.json({ point, items });
  }
}

export default new ShowPointService();
