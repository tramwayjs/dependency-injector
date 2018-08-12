import {ClassDefinition} from '../entities';
import { DependencyInjector } from '../dependencies';
import {ClassDoesNotExistError} from '../errors';

/**
 * @export
 * @class ClassBuilder
 */
export default class ClassBuilder {
    /**
     * Creates an instance of ClassBuilder.
     * 
     * @param {DependencyInjector} service
     * 
     * @memberOf ClassBuilder
     */
    constructor(dependencyInjector) {
        this.dependencyInjector = dependencyInjector;
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
     * @param {ClassDefinition} service
     * @returns {*}
     * 
     * @memberOf ClassBuilder
     */
    build(service) {
        const Class = service.getClass();

        if (!Class) {
            throw new ClassDoesNotExistError(service.getKey());
        }

        let constructorArgs = service.getConstructorArgs();
        let functionsArgs = service.getFunctionsArgs();

        if (this.dependencyInjector) {
            constructorArgs = service.getConstructorArgs().map(arg => this.dependencyInjector.prepare(arg));
            functionsArgs = service.getFunctionsArgs().map(func => {
                func.args = func.args.map(arg => this.dependencyInjector.prepare(arg));
                return func;
            });
        }

        let instance = new Class(...constructorArgs);
        functionsArgs.forEach(function(func) {
            if (func.function in instance && typeof instance[func.function] === "function") {
                instance[func.function](...func.args);
            }
        });

        return instance;
    }
}

