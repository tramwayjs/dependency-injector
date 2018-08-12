import { 
    DependencyManager, 
    DependencyInjector, 
    ServicesManager, 
    ParametersManager,
} from './dependencies';
import {ClassBuilder} from './util';

var manager = null;

class DependencyResolver {
    constructor() {
        if (manager) {
            return manager;
        }
        this.dependencyManager = new DependencyManager();
        this.dependencyInjector = new DependencyInjector(this.dependencyManager);
        this.created = false;
        manager = this;
    }

    create(servicesManager, parametersManager) {
        servicesManager = servicesManager || new ServicesManager();
        parametersManager = parametersManager || new ParametersManager();

        servicesManager.setClassBuilder(new ClassBuilder(this.dependencyInjector));

        this.dependencyManager = this.dependencyManager.create(servicesManager, parametersManager);
        this.created = true;
        return this;
    }

    initialize(services, parameters) {
        if (!this.created) {
            this.create();
        }
        
        this.dependencyManager = this.dependencyManager.initializeParameters(parameters);
        services = this.dependencyInjector.injectParameters(services);
        this.dependencyManager = this.dependencyManager.initializeServices(services);
        return this;
    }

    getService(key) {
        let service = this.dependencyManager.getService(key);
        return this.dependencyInjector.injectService(service);
    }

    getParameter(key) {
        return this.dependencyManager.getParameter(key);
    }
}

export default new DependencyResolver();