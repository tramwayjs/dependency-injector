import { 
    DependencyManager, 
    DependencyInjector, 
    ServicesManager, 
    ParametersManager,
} from './dependencies';
import {ClassBuilder} from './util';

var manager = new Map();

class DependencyResolver {
    constructor(name) {
        this.name = name;
        const instance = manager.get(name);

        if (instance) {
            return instance;
        }

        this.dependencyManager = new DependencyManager();
        this.dependencyInjector = new DependencyInjector(this.dependencyManager);
        this.created = false;
        
        manager.set(this.name, this);
    }

    create(servicesManager, parametersManager) {
        servicesManager = servicesManager || new ServicesManager();
        parametersManager = parametersManager || new ParametersManager();

        servicesManager.setClassBuilder(new ClassBuilder(this.dependencyInjector));

        this.dependencyManager = this.dependencyManager.create(servicesManager, parametersManager);
        this.created = true;

        
        manager.set(this.name, this);
        return this;
    }

    initialize(services, parameters) {
        if (!this.created) {
            this.create();
        }
        
        this.dependencyManager = this.dependencyManager.initializeParameters(parameters);
        services = this.dependencyInjector.injectParameters(services);
        this.dependencyManager = this.dependencyManager.initializeServices(services);

        manager.set(this.name, this);
        return this;
    }

    getService(key) {
        let service = this.dependencyManager.getService(key);
        return this.dependencyInjector.injectService(service);
    }

    getParameter(key) {
        return this.dependencyManager.getParameter(key);
    }

    terminate() {
        this.dependencyManager.terminate();
        return this;
    }

    getDependencyManager() {
        return this.dependencyManager;
    }

    isCreated() {
        return this.created;
    }

    getName() {
        return this.name;
    }
}

export default new DependencyResolver();

export function createDependencyResolver(name) {
    if (manager.get(name)) {
        return manager.get(name);
    }

    return new DependencyResolver(name)
};