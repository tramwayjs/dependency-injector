import DependencyManager from './DependencyManager';

/**
 * @export
 * @class DependencyInjector
 */
export default class DependencyInjector {
    /**
     * Creates an instance of DependencyInjector.
     * 
     * @param {DependencyManager} dependencies
     * 
     * @memberOf DependencyInjector
     */
    constructor(dependencies) {
        this.dependencies = dependencies;
    }

    /**
     * @param {Object} services
     * @returns {Object}
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

    /**
     * 
     * @param {Object} arg {key: string, type: string}
     * @param {string} arg.type
     * @param {string} arg.key
     * @returns {boolean}
     * 
     * @memberOf DependencyInjector
     */
    isInjectableCriteria(arg) {
        return arg && "object" === typeof arg && Object.keys(arg).length === 2 && "type" in arg && "key" in arg;
    }

    /**
     * 
     * @param {*} arg
     * @returns {*}
     * 
     * @memberOf DependencyInjector
     */
    injectParameter(arg) {
        if (this.isInjectableCriteria(arg) && "parameter" === arg.type) {
           return this.dependencies.getParameter(arg.key);
        }

        return arg;
    }

    /**
     * @param {Object} service
     * @returns {Object}
     * 
     * @memberOf DependencyInjector
     */
    injectService(service) {
        for (let key in service) {
            if (this.isInjectableCriteria(service[key]) && "service" === service[key].type) {
                service[key] = this.dependencies.getService(service[key].key);
            }
        }

        return service;
    }
    
    prepare(arg) {
        if (!this.isInjectableCriteria(arg)) {
            return arg;
        }
        
        const {type, key} = arg;

        return this.dependencies.get(type, key);
    }
}