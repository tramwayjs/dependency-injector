import DependencyManager from './DependencyManager';

import {services} from 'tramway-core';
let {TypeEnforcementService} = services;

export default class DependencyInjector {
    constructor(dependencies) {
        this.dependencies = TypeEnforcementService.enforceInstance(dependencies, DependencyManager);
    }

    /** 
     * @param {Map<string, Map>} services
     * 
     * @memberOf DependencyInjector
     */
    injectParameters(services) {
        for(let key in services) {
            let service = services[key];

            if ("constructor" in service && service.constructor instanceof Array) {
                services[key].constructor = service.constructor.map((arg) => {
                    return this.injectParameter(arg);
                });
            }

            if ("functions" in service && service.functions instanceof Array) {
                services[key].functions = service.functions.map((func) => {
                    func.args = func.args.map((arg) => {
                        return this.injectParameter(arg);
                    });
                    return func;
                });
            }
        }
        return services;
    }

    isInjectableCriteria(arg) {
        return "object" === typeof arg && Object.keys(arg).length === 2 && "type" in arg && "key" in arg;
    }

    injectParameter(arg) {
        if (this.isInjectableCriteria(arg) && "parameter" === arg.type) {
           return this.dependencies.getParameter(arg.key);
        }

        return arg;
    }

    injectService(service) {
        for (let key in service) {
            if (this.isInjectableCriteria(service[key]) && "service" === service[key].type) {
                service[key] = this.dependencies.getService(service[key].key);
            }
        }

        return service;
    }    
}