import ServiceParameters from './entities/ServiceParameters';

/**
 * @export
 * @class ServiceBuilder
 */
export default class ServiceBuilder {
    /**
     * Creates an instance of ServiceBuilder.
     * 
     * @param {ServiceParameters} service
     * 
     * @memberOf ServiceBuilder
     */
    constructor(service) {
        this.Class = service.getClass();
        this.constructorArgs = service.getConstructorArgs();
        this.functionsArgs = service.getFunctionsArgs();
    }

    /**
     * @returns {*}
     * 
     * @memberOf ServiceBuilder
     */
    prepare() {
        let instance = new this.Class(...this.constructorArgs);
        this.functionsArgs.forEach(function(func) {
            if (func.function in instance && typeof instance[func.function] === "function") {
                instance[func.function](...func.args);
            }
        });
        return instance;
    }
}

