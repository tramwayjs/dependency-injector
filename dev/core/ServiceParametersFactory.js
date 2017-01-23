import ServiceParameters from './entities/ServiceParameters';

/**
 * 
 * @export
 * @class ServiceParametersFactory
 */
export default class ServiceParametersFactory {
    /**
     * 
     * @static
     * @param {Object} services
     * @returns {Map<string, ServiceParameters>}
     * 
     * @memberOf ServiceParametersFactory
     */
    static create(services) {
        let serviceParams = new Map();
        Object.keys(services).forEach(key => {
            serviceParams.set(key, new ServiceParameters(key, services[key].class, services[key].constructor, services[key].functions));
        });
        return serviceParams;
    }
}