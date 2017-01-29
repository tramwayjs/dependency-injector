import DependencyManager from './dependencies/DependencyManager';

var manager = null;

class DependencyResolver {
    constructor() {
        if (manager) {
            return manager;
        }
        this.dependencyManager = new DependencyManager();
        manager = this;
    }

    create(servicesManager, parametersManager) {
        this.dependencyManager = this.dependencyManager.create(servicesManager, parametersManager);
        return this;
    }

    initialize(services, parameters) {
        this.dependencyManager = this.dependencyManager.initialize(services, parameters);
        return this;
    }

    getService(key) {
        return this.dependencyManager.getService(key);
    }

    getParameter(key) {
        return this.dependencyManager.getParameter(key);
    }
}

export default new DependencyResolver();