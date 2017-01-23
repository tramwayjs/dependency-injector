'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import {Router} from 'tramway-core';
import routes from './routes/routes.js';

import * as parameters from './config/parameters';

import ParametersManager from './core/ParametersManager';

let params = new ParametersManager(parameters);
console.log(params.get('exampleAPI'));
global.config = params;


import ServicesManager from './core/ServicesManager';

import services from './config/services';

let manager = new ServicesManager(services);
console.log(manager);
 
console.log(manager.get('randomclass'));
console.log(manager.get('exampleapiconnection'));
console.log(manager.get('ad'));
console.log(manager);



const PORT = 8081;

let app = express();
app.use(methodOverride('_method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(global.config.get('cors'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let router = new Router(app, routes);
app = router.initialize();

app.listen(PORT);
console.log(`Started on port ${PORT}`);

export default app;