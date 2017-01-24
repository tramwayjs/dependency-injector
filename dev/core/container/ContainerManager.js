import {errors} from 'tramway-core';
let {AbstractMethodError} = errors;

/**
 * 
 * @export
 * @class ContainerManager
 */
export default class ContainerManager {
    /**
     * @param {string} key
     * 
     * @memberOf ContainerManager
     */
    get(key) {
        throw new AbstractMethodError();
    }

    /**
     * 
     * 
     * @param {Object|Map<string, Object>} items
     * 
     * @memberOf ContainerManager
     */
    initialize(items) {
        throw new AbstractMethodError();
    }
}