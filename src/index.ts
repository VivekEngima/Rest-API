import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import router from './router';
import mongoose from 'mongoose';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8000, () => {
  console.log('Server running on http://localhost:8000/');
});

const MONGO_URL =
  'mongodb+srv://vivekvyasdeveloper:ZFyaa8TamkKbDn7Y@api.pqgqtr9.mongodb.net/API?retryWrites=true&w=majority'; // DB URI

mongoose.set('strictQuery', true);
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL, () => console.log(`DB connected sucessfully`));
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
