import ParametersManager from './ParametersManager';

import {services} from 'tramway-core';
let {TypeEnforcementService} = services;

export default class DependencyInjector {
    constructor(parameters) {
        this.parameters = TypeEnforcementService.enforceInstance(parameters, ParametersManager);
    }

    /** 
     * @param {Map<string, Map>} services
     * 
     * @memberOf DependencyInjector
     */
    inject(services) {
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

    injectParameter(arg) {
        if ("object" === typeof arg && Object.keys(arg).length === 2 && "type" in arg && "key" in arg) {
            switch (arg.type) {
                case "parameter": return this.parameters.get(arg.key);
            }
        }

        return arg;
    }
}