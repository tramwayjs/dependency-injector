import Container from '../container/Container';
import ContainerManager from '../container/ContainerManager';
import DependencyInjector from './DependencyInjector';

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
        this.servicesManager = servicesManager;
        this.parametersManager = parametersManager;
        return this;
    }

    initializeParameters(parameters) {
        this.parametersManager = this.parametersManager && this.parametersManager.initialize(parameters);
        return this;
    }

    initializeServices(services) {
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
        return this.servicesManager && this.servicesManager.get(key);
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