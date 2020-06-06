import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer'

import CreatePointsService from './services/CreatePointsService';
import ListItemsService from './services/ListItemsService';
import ShowPointService from './services/ShowPointService'
import ListPointsService from './services/ListPointsService'

import CreatePointValidation from './validations/CreatePoint'

const routes = Router();
const upload = multer(multerConfig);

routes.get('/items', ListItemsService.run);

routes.post('/points', upload.single('image'), CreatePointValidation, CreatePointsService.run);

routes.get('/point/:id', ShowPointService.run);

routes.get('/points', ListPointsService.run);

export default routes;
