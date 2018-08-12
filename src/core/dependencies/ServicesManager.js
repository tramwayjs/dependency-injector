import {Container, ContainerManager} from '../container';
import {ClassDefinitionFactory, ClassBuilder} from '../util';
import {ServiceNotFoundError} from '../errors';

/**
 * 
 * @class ServicesManager
 * @extends {ContainerManager}
 */
export default class ServicesManager extends ContainerManager {

    /**
     * Creates an instance of ServicesManager.
     * 
     * @memberOf ServicesManager
     */
    constructor() {
        super();
        this.services = null;
        this.instances = null;
        this.classBuilder = new ClassBuilder();
    }

    /**
     * 
     * @param {Object} services
     * @returns
     * 
     * @memberOf ServicesManager
     */
    initialize(services) {
        this.services = this.prepareServices(services);
        this.instances = new Container();
        return this;
    }

    /**
     * 
     * 
     * @param {Object} services
     * @returns {Container}
     * 
     * @memberOf ServicesManager
     */
    prepareServices(services) {
        services = ClassDefinitionFactory.create(services);
        return new Container(services);
    }

    /**
     * 
     * @param {string} key
     * @returns {Object}
     * 
     * @memberOf ServicesManager
     */
    get(key) {
        let instance = this.instances.get(key);
        if (null !== instance) {
            return instance;
        }

        return this.prepareInstance(key);
    }

    /**
     * 
     * @param {string} key
     * @returns {Object}
     * 
     * @memberOf ServicesManager
     */
    prepareInstance(key) {
        let service = this.services.get(key);

        if (null === service) {
            throw new ServiceNotFoundError(key);
        }
        
        service = this.classBuilder.build(service);
        this.instances.set(key, service);
        return service;
    }

    setClassBuilder(classBuilder) {
        this.classBuilder = classBuilder;
        return this;
    }
}