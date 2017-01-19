import FuncParser from './Parser/FunctionParser';

/**
 * @class
 */
class ServiceContainer {

    constructor() {
        this.dependencies = {};
        this.factories = {};
    }

    /**
     *
     * @param {string} name
     * @param {Object} factory
     */
    factory(name, factory) {
        this.factories[name] = factory;
    }

    /**
     *
     * @param {string} name
     * @param {Object} dependency
     */
    register(name, dependency) {
        this.dependencies[name] = dependency;
    }

    /**
     *
     * @param {Object} factory
     * @return {*}
     */
    inject(factory) {
        const args = FuncParser.parse(factory);
        const deps = args.map(dependency => this.get(dependency));

        Reflect.construct(factory, deps);

        return factory
    }

    /**
     *
     * @param {string} name
     * @return {*}
     */
    get(name) {
        if (!this.dependencies[name]) {
            const factory = this.factories[name];

            this.dependencies[name] = factory && this.inject(factory);

            if (!this.dependencies[name]) {
                throw new Error(`Cannot find module: ${name}`);
            }
        }
        return this.dependencies[name];
    }
}


export default new ServiceContainer();