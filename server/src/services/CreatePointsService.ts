import { Request, Response } from 'express';
import knex from '../database/connection';

class CreatePointsService {
  async run(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      items,
      uf,
      city,
      longitude,
      latitude,
    } = req.body;

    const trx = await knex.transaction();

    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      longitude,
      latitude,
      city,
      uf,
    };

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return { item_id, point_id };
      });

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return res.json({ id: point_id, ...point });
  }
}

export default new CreatePointsService();
