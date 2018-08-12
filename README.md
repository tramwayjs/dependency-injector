Tramway Dependency Injector is a simple container manager with powerful capabilities to enhance the Tramway core. It includes:

1. A new DependencyResolver which acts as a facade to handle all services and parameters
2. Dependency injection capabilities which are simple to implement in configuration files
3. Environment-aware parameter mapping to harmonize global and environment-specific parameters. Useful for Dockerized projects.
4. Container and ContainerManager classes to create and interface with containers of data
5. ClassDefinition and ClassBuilder to convert configuration into fully developped classes. Among other utilities.
and so much more.

# Installation:
1. `npm install tramway-core-dependency-injector`

# Example project
https://gitlab.com/tramwayjs/tramway-core-dependency-injector-example

# Getting Started

## Making your Tramway app injection ready
In addition to using the new configuration structure detailed below, you will need to add the following to your server configuration file - in Tramway examples this is the `server.js` file at the root - to get started.

```javascript
import {DependencyResolver} from 'tramway-core-dependency-injector';

import * as parameters from './config/parameters';
import services from './config/services';

DependencyResolver.initialize(services, parameters);
```
In terms of implementation, this and configuration format is all that is needed to use the service but every piece will be documented further for extendability and tweaks as need be.

With the above code implemented, any time you access the `DependencyResolver` anywhere in the project, you will have access to its interface and all of the services and parameters made available at initialization.

```javascript
import {DependencyResolver} from 'tramway-core-dependency-injector';
```

## Recommended Folder Structure in addition to Tramway
```
+ config
+- parameters
++- global
++- env1
++- env2
++- services
- services
```

## Expected config structure
The enhanced structure permits you to have multiple config files of any type - though Tramway presently supports js modules - or one that meets the following criteria. Parameters and Services are given their own sub folders and the environments are separated to make it easier to organize.
To use this structure, ensure you have `index.js` files that connect the multiple sub-directories.

The resulting objects should be interpreted as a nested key-value store which can easily be converted to a `Map`.

### Parameter Structure
The root of the parameter object must have all the available environments with the default one set to "global". From this point, the different keys apart from global would contain environment-specific variables to override the globals.

Using multiple files in different directories can achieve the following root `index.js` file.
```javascript
import * as global from './global';
import * as docker from './docker';
import * as development from './development';

export {global, docker, development};
```

As a sample, this structure would translate to the following once read by the `DependencyResolver`:

```json
{
    "global": {
        "exampleAPI": {
            "host": "localhost",
            "port": 8080,
            "path": "model",
            "respondAsText": false
        }
    },
    "docker": {
        "exampleAPI": {
            "host": "api",
        }
    },
    ...
}
```

When running on a docker environment set in `NODE_ENV` as 'docker' the exampleAPI parameter will have a host of `api` instead of `localhost` since docker abstracts location logic to service names.

### Service Structure
Services are expected to be read as key-value pairs where the key is the service name and the value is the service definition.

A simple configuration could look like the following.
```javascript
{
    "randomclass": {
        "class": RandomClass,
        "constructor": [1, 2]
    },
    "exampleapiconnection": {
        "class": RestAPIConnection,
        "constructor": [{"type": "parameter", "key": "exampleAPI"}]
    }
}
```
Note that the constructor takes an array of arguments. In `exampleapiconnection` the constructor takes an object which is a special dependency-related inject which will be covered later. 

### Dependency Objects
In your config you may find a service needs a parameter or another service. This purpose is fulfilled simply with the `DependencyInjector` by adding a specially formatted object in your corresponding configuration file.

```json
{
    type: "parameter|service",
    key: "nameofdependencyparameter"
}
```

The object with a type of parameter or service and the key will be resolved at runtime to be replaced with the corresponding parameter or service.

For example, a service 'ad1' that is dependent 'ad2' which needs parameters from the 'exampleAPI' parameter would have a config snippet that looks like the following:

```javascript
"ad": {
    "class": RandomClass,
    "constructor": [{"type": "parameter", "key": "exampleAPI"}]
},
"ad2": {
    "class": RandomClass2,
    "functions": [
        {
            "function": "setC",
            "args": [{"type": "service", "key": "ad"}]
        }
    ]
}
```

The above would translate to the following execution call when getting the `ad2` service:

```javascript
let a = DependencyResolver.getService('ad2');

// Will return the equivalent to the following on a singleton basis:
let a = (new RandomClass2()).setC(new RandomClass({
    "host": "localhost",
    "port": 8080,
    "path": "model",
    "respondAsText": false
    })
);
```

## Customizing the Dependency Injection library
In the event that you want to override the `ParametersManager` and `ServicesManager` to add or modify logic to suit your needs, you can achieve so by extending them in your custom classes and overriding the default creation cycle of the `DependencyResolver`

Example:

In your <Dependency|Service>Manager file:

```javascript
import {dependencies} from 'tramway-core-dependency-injector';
const {ParametersManager, ServicesManager} = dependencies;

export default class MyParametersManager extends ParametersManager {}
```

```javascript
import {DependencyResolver} from 'tramway-core-dependency-injector';
import {MyServicesManager, MyParametersManager} from './core/dependency_injection/managers';

import * as parameters from './config/parameters';
import services from './config/services';

DependencyResolver.create(new MyServicesManager(), new MyParametersManager()).initialize(services, parameters);
```

# Documentation
Everything stated above is enough to get you started. If you want to understand how it works or extend from this library, the details will be fleshed out below.

## Overall Lifecycle
The Dependency Injection service uses the following lifecycle to handle dependencies, services and injections. It follows three simple stages from inception to execution. All created services are stored as singletons in an instances container.

1. The `DependencyResolver` gets created in `services.js` with and handles the construction of a `DependencyManager` using a `ServicesManager` and a `ParametersManager`.
2. The `DependencyResolver` gets initiatialized with config data.
    1. The parameters get processed first by the `ParametersManager` where a recursive unification is performed to unify environment variables with accordance to that of the current Node process.
    2. A `DependencyInjector` is created to inject parameters into the raw services by means of finding the Dependency Objects.
    3. The `ServicesManager` recursively handles the updated services and stores them in their own container.
3. The `DependencyResolver` gets a request to get a service.
    1. It will check an internal instances `Container` and return that instance if it's there. Otherwise, it will create a new `DependencyInjector` tasked with getting or building prerequisite services.
    2. The created instance is stored in the instances container handled by the `ServicesManager` and the instance is returned via the `DependencyResolver`.

## Dependency Resolver
The `DependencyResolver` tucks way the dependency injectio system but was made available for extendability with this library.

### Available Methods

| Method | Arguments | Purpose | 
| --- | --- | --- |
| create | ServicesManager, ParametersManager | Creates the DependencyManager with the prerequisite sub-managers |
| initialize | services: {}, parameters: {} | Converts and stores the configuration data loaded at app startup via the server file |
| getService | service: string | Gets a service completely initialized (or an existing instance if it has already been executed) |
| getParameter | parameter: string | Gets a parameter completely built with its sub-parameters already built as well |

## Containers

### Container
The container is a simple and secure abstraction of the new `Map` class in ES6+. It also is responsible for managing the conversion of Objects to Maps as they get set.
```javascript
import {container} from 'tramway-core-dependency-injector;
let {Container} = container;
```

| Method | Arguments | Purpose | 
| --- | --- | --- |
| constructor | items: Map/{} | Creates a container with the initial items in a Map or Object (as a key-value relationship) |
| buildMap | obj: {} | Converts a given object to a usable map |
| get | key: string | Gets an item from the container |
| set | key: string, value: * | Sets an item to a key in the container |

### ContainerManager
An abstract class which makes sure the `DependencyManager`, `ServicesManager` and `ParametersManager` maintain a consistent interface and are compatible with the `Container`. It is a bit more restrictive, offering an initialize and getter.
```javascript
import {container} from 'tramway-core-dependency-injector;
let {ContainerManager} = container;
```

| Method | Arguments | Purpose | 
| --- | --- | --- |
| initialize | obj: {}/Map | Handles initial data |
| get | key: string | Gets an item from the container |

## Dependencies

### DependencyInjectior
The DependencyInjector is an internal facade that is able to communicate with the DependencyManager to bridge missing pieces between the ServicesManager and ParametersManger without directly interfering with their internal processes.
```javascript
import {dependencies} from 'tramway-core-dependency-injector;
let {DependencyInjectior} = dependencies;
```

Furthermore, it enforces the structured configuration object for parameters and services which it checks against when scanning for dependencies to replace.

### DependencyManager, ParametersManager, ServicesManager
The DependencyManager and its sub-managers ParametersManager and ServicesManager handle all the necessary transactions to register services and make them easily attainable by the DependencyResolver.
```javascript
import {dependencies} from 'tramway-core-dependency-injector;
let {DependencyManager, ParametersManger, ServicesManager} = dependencies;
```

## Entities

### ClassDefinition
```javascript
import {entities} from 'tramway-core-dependency-injector;
const {ClassDefinition} = entities;
```

| Method | Arguments | Return |
| --- | --- | --- |
| constructor | key: string, Class: Object, constructorArgs: [], functionsArgs: [] | |
| getKey | | string |
| getClass | | Object |
| getConstructorArgs | | [] |
| getFunctionsArgs | | [] |

## Utils

### ClassDefinitionFactory
Converts plain javascript objects passed by the `DependencyManager` into standardized `ClassDefinition`s so they can be used in the builder later on to build new instances. 

```javascript
import {util} from 'tramway-core-dependency-injector;
const {ClassDefinitionFactory} = util;

...

let map = ClassDefinitionFactory.create(services);
```

### ClassBuilder
Creates a class or service given the corresponding `ClassDefinition`. It will construct the instance and make the specified function calls with the arguments and return an instance which will be returned to the `DependencyResolver` via the `DependencyManager`.

```javascript
import {util} from 'tramway-core-dependency-injector;
const {ClassBuilder} = util;

...

let service = (new ClassBuilder(dependencyInjector)).build(service);
```

### MapFactory
A static utility made to simplify the process of converting between Objects and Maps recursively.

```javascript
import {util} from 'tramway-core-dependency-injector;
const {MapFactory} = util;
```

| Method | Arguments | Return |
| --- | --- | --- |
| create | obj: Object, isRecursive: boolean/false | Map |
| convertToObject | value: Map, isRecursive: boolean/false | Object |

## Errors

### Error
The library adds a new ServiceNotFound error which is triggered when a service isn't found. It takes the name of the service as an argument.

```javascript
import {errors} from 'tramway-core-dependency-injector;
let {ServiceNotFoundError} = errors;

...

throw new ServiceNotFoundError('someservice');
```