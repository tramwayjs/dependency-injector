'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import {Router} from 'tramway-core';
import routes from './routes/routes.js';

import ParametersManager from './core/ParametersManager';
import ServicesManager from './core/ServicesManager';

import * as parameters from './config/parameters';
import services from './config/services';

ParametersManager.initialize(parameters);
ServicesManager.initialize(services);

const PORT = 8081;

let app = express();
app.use(methodOverride('_method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(ParametersManager.get('cors'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let router = new Router(app, routes);
app = router.initialize();

app.listen(PORT);
console.log(`Started on port ${PORT}`);

export default app;