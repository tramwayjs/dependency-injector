import Container from './container/Container';
import ServiceParametersFactory from './ServiceParametersFactory';
import ServiceBuilder from './ServiceBuilder';
import ServiceNotFoundError from './errors/ServiceNotFoundError';

export default class ServicesManager {
    constructor(services) {
        this.services = this.prepareServices(services);
        this.instances = new Container();
    }

    prepareServices(services) {
        services = ServiceParametersFactory.create(services);
        return new Container(services);
    }

    get(key) {
        let instance = this.instances.get(key);
        if (null !== instance) {
            return instance;
        }

        return this.prepareInstance(key);
    }

    prepareInstance(key) {
        let service = this.services.get(key);

        if (null === service) {
            throw new ServiceNotFoundError(key);
        }
        
        service = (new ServiceBuilder(service)).prepare();
        this.instances.set(key, service);
        return service;
    }
}