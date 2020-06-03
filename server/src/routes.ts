import { Router } from 'express';

import CreatePointsService from './services/CreatePointsService';
import ListItemsService from './services/ListItemsService';
import ShowPointService from './services/ShowPointService'
import ListPointsService from './services/ListPointsService'

const routes = Router();

routes.get('/items', ListItemsService.run);

routes.post('/points', CreatePointsService.run);

routes.get('/point/:id', ShowPointService.run);

routes.get('/points', ListPointsService.run);

export default routes;
