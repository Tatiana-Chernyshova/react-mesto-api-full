const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const rootRouter = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const corsOptions = {
  origin: [
    'https://mrld.nomoredomains.rocks/',
    'http://mrld.nomoredomains.rocks/',
    'localhost:3000',
  ],
  credentials: true,
};

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors(corsOptions));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', rootRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3000);
