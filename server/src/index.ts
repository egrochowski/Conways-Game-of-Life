require('dotenv').config();
import express from 'express';
import path from 'path';
import router from './routes';
import cors from 'cors';
import morgan from 'morgan';
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);
app.use(express.static(path.join(__dirname, './../../client/public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}...`);
});
