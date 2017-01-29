'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import {Router} from 'tramway-core';
import routes from './routes/routes.js';

import DependencyResolver from './core/DependencyResolver';
import ParametersManager from './core/dependencies/ParametersManager';
import ServicesManager from './core/dependencies/ServicesManager';

import * as parameters from './config/parameters';
import services from './config/services';

DependencyResolver.create(new ServicesManager(), new ParametersManager()).initialize(services, parameters);

const PORT = 8081;

let app = express();
app.use(methodOverride('_method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(DependencyResolver.getParameter('cors'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let router = new Router(app, routes);
app = router.initialize();

app.listen(PORT);
console.log(`Started on port ${PORT}`);

export default app;