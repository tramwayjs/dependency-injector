import Container from './container/Container';
import ContainerManager from './container/ContainerManager';

import ClassDefinitionFactory from './ClassDefinitionFactory';
import ClassBuilder from './ClassBuilder';
import ServiceNotFoundError from './errors/ServiceNotFoundError';

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
        
        service = (new ClassBuilder(service)).prepare();
        this.instances.set(key, service);
        return service;
    }
}