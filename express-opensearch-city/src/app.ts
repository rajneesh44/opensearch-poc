import express = require('express');
require('express-async-errors');
import CityOsService from './services/city-os-service';
import {
  GenericExceptionHandler,
  NotFoundExceptionHandler,
} from './utils/error-handling';

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port:${port}!`);
});

app.use('/api/v1', require('./routes'));

const cityOsService = new CityOsService();
cityOsService.initIndex();

app.use(NotFoundExceptionHandler);
app.use(GenericExceptionHandler);
