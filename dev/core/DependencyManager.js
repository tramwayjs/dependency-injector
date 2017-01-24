import Container from './container/Container';
import ContainerManager from './container/ContainerManager';
import {services} from 'tramway-core';
let {TypeEnforcementService} = services;

export default class DependencyManager extends ContainerManager {
    constructor() {
        super();
        this.servicesManager = null;
        this.parametersManager = null;
    }

    create(servicesManager, parametersManager) {
        this.servicesManager = TypeEnforcementService.enforceInstance(servicesManager, ContainerManager);
        this.parametersManager = TypeEnforcementService.enforceInstance(parametersManager, ContainerManager);
        return this;
    }

    initialize(services, parameters) {
        this.servicesManager = this.servicesManager && this.servicesManager.initialize(services);
        this.parametersManager = this.parametersManager && this.parametersManager.initialize(parameters);
        return this;
    }

    getService(key) {
        return this.servicesManager && this.servicesManager.get(key);
    }

    getParameter(key) {
        return this.parametersManager && this.parametersManager.get(key);
    }

    get(type, key) {
        switch(type) {
            case 'service': return this.getService(key);
            case 'parameter': return this.getParameter(key);
        }
        return null;
    }
}