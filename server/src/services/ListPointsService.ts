import { Request, Response } from 'express';
import knex from '../database/connection';

import { APP_URL } from '../common/constants';

class ShowPointService {
  async run(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    if (!points) return res.status(400).json({ message: 'Point not found.' });

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `${APP_URL}/uploads/${point.image}`,
      };
    });

    return res.json(serializedPoints);
  }
}

export default new ShowPointService();
