import 'dotenv'

import express from 'express';
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import routes from './routes';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(port, () => console.log(`api listing port: ${port}`));
