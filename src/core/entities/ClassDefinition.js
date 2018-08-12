/**
 * 
 * @export
 * @class ClassDefinition
 * @extends {Entity}
 */
export default class ClassDefinition {

    /**
     * Creates an instance of ClassDefinition.
     * 
     * @param {string} key
     * @param {Object} Class
     * @param {[]} constructorArgs
     * @param {[]} functionsArgs
     * 
     * @memberOf ClassDefinition
     */
    constructor(key, Class, constructorArgs, functionsArgs) {
        this.key = key;
        this.Class = Class;
        this.constructorArgs = Array.isArray(constructorArgs) ? constructorArgs : [];
        this.functionsArgs = Array.isArray(functionsArgs) ? functionsArgs : [];
    }

    /**
     * @returns {string}
     * 
     * @memberOf ClassDefinition
     */
    getKey() {
        return this.key;
    }

    /**
     * @returns {Object}
     * 
     * @memberOf ClassDefinition
     */
    getClass() {
        return this.Class;
    }

    /**
     * @returns {[]}
     * 
     * @memberOf ClassDefinition
     */
    getConstructorArgs() {
        return this.constructorArgs;
    }

    /**
     * @returns {[]}
     * 
     * @memberOf ClassDefinition
     */
    getFunctionsArgs() {
        return this.functionsArgs;
    }
}