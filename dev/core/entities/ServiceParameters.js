import {Entity, services} from 'tramway-core';
let {TypeEnforcementService} = services;

/**
 * 
 * @export
 * @class ServiceParameters
 * @extends {Entity}
 */
export default class ServiceParameters extends Entity {

    /**
     * Creates an instance of ServiceParameters.
     * 
     * @param {string} key
     * @param {Object} Class
     * @param {[]} constructorArgs
     * @param {[]} functionsArgs
     * 
     * @memberOf ServiceParameters
     */
    constructor(key, Class, constructorArgs, functionsArgs) {
        super();
        this.key = TypeEnforcementService.enforceTypes(key, 'string');
        this.Class = Class;
        this.constructorArgs = Array.isArray(constructorArgs) ? constructorArgs : [];
        this.functionsArgs = Array.isArray(functionsArgs) ? functionsArgs : [];
    }

    /**
     * @returns {string}
     * 
     * @memberOf ServiceParameters
     */
    getKey() {
        return this.key;
    }

    /**
     * @returns {Object}
     * 
     * @memberOf ServiceParameters
     */
    getClass() {
        return this.Class;
    }

    /**
     * @returns {[]}
     * 
     * @memberOf ServiceParameters
     */
    getConstructorArgs() {
        return this.constructorArgs;
    }

    /**
     * @returns {[]}
     * 
     * @memberOf ServiceParameters
     */
    getFunctionsArgs() {
        return this.functionsArgs;
    }
}