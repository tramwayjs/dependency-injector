import {ClassDefinition} from '../entities';
import { ServiceAlreadyExistsError } from '../errors';

/**
 * 
 * @export
 * @class ClassDefinitionFactory
 */
export default class ClassDefinitionFactory {
    /**
     * 
     * @static
     * @param {Object} services
     * @returns {Map<string, ClassDefinition>}
     * 
     * @memberOf ClassDefinitionFactory
     */
    static create(services) {
        let serviceParams = new Map();
        Object.keys(services).forEach(key => {
            if (serviceParams.has(key)) {
                throw new ServiceAlreadyExistsError(key);
            }
            
            serviceParams.set(key, new ClassDefinition(key, services[key].class, services[key].constructor, services[key].functions));
        });
        return serviceParams;
    }
}