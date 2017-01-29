import Container from './container/Container';
import ContainerManager from './container/ContainerManager';
import DependencyInjector from './DependencyInjector';
import {services} from 'tramway-core';
let {TypeEnforcementService} = services;

export default class DependencyManager extends ContainerManager {
    /**
     * Creates an instance of DependencyManager.
     * @memberOf DependencyManager
     */
    constructor() {
        super();
        this.servicesManager = null;
        this.parametersManager = null;
    }

    /**
     * @param {ContainerManager} servicesManager
     * @param {ContainerManager} parametersManager
     * @returns {DependencyManager}
     * 
     * @memberOf DependencyManager
     */
    create(servicesManager, parametersManager) {
        this.servicesManager = TypeEnforcementService.enforceInstance(servicesManager, ContainerManager);
        this.parametersManager = TypeEnforcementService.enforceInstance(parametersManager, ContainerManager);
        return this;
    }

    /**
     * @param {Object} services
     * @param {Object} parameters
     * @returns {DependencyManager}
     * 
     * @memberOf DependencyManager
     */
    initialize(services, parameters) {
        this.parametersManager = this.parametersManager && this.parametersManager.initialize(parameters);
        services = (new DependencyInjector(this)).injectParameters(services);
        this.servicesManager = this.servicesManager && this.servicesManager.initialize(services);
        return this;
    }

    /**
     * @param {string} key
     * @returns {any}
     * 
     * @memberOf DependencyManager
     */
    getService(key) {
        let service = this.servicesManager && this.servicesManager.get(key);
        return (new DependencyInjector(this)).injectService(service);
    }

    /**
     * @param {string} key
     * @returns {any}
     * 
     * @memberOf DependencyManager
     */
    getParameter(key) {
        return this.parametersManager && this.parametersManager.get(key);
    }

    /**
     * @param {string} type
     * @param {string} key
     * @returns {any|null}
     * 
     * @memberOf DependencyManager
     */
    get(type, key) {
        switch(type) {
            case 'service': return this.getService(key);
            case 'parameter': return this.getParameter(key);
        }
        return null;
    }
}