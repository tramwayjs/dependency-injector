import ClassDefinition from '../entities/ClassDefinition';

/**
 * @export
 * @class ClassBuilder
 */
export default class ClassBuilder {
    /**
     * Creates an instance of ClassBuilder.
     * 
     * @param {ClassDefinition} service
     * 
     * @memberOf ClassBuilder
     */
    constructor(service) {
        this.Class = service.getClass();
        this.constructorArgs = service.getConstructorArgs();
        this.functionsArgs = service.getFunctionsArgs();
    }

    prepareConstructor(cb) {
        this.constructorArgs = cb(this.constructorArgs);
        return this;
    }

    prepareFunction(cb) {
        this.functionsArgs = cb(this.functionsArgs);
        return this;
    }

    /**
     * @returns {*}
     * 
     * @memberOf ClassBuilder
     */
    build() {
        let instance = new this.Class(...this.constructorArgs);
        this.functionsArgs.forEach(function(func) {
            if (func.function in instance && typeof instance[func.function] === "function") {
                instance[func.function](...func.args);
            }
        });
        return instance;
    }
}

