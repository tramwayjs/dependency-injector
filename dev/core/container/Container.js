import {services} from 'tramway-core';
let {TypeEnforcementService} = services;

/**
 * @export
 * @class Container
 */
export default class Container {
    /**
     * @param {Map<string, *>|Object} items
     * 
     * @memberOf Container
     */
    constructor(items) {
        if (!(items instanceof Map)) {
            if ('object' !== typeof items) {
                this.items = new Map();
            } else {
                this.items = this.buildMap(items);
            }
        } else {
            this.items = items;
        }
    }

    /**
     * 
     * @param {Object} obj
     * @returns {Map<string, Map<>>}
     * 
     * @memberOf Container
     */
    buildMap(obj) {
        let map = new Map();
        
        Object.keys(obj).forEach(key => {
            map.set(key, obj[key]);
        });
        return map;
    }

    /**
     * 
     * @param {string} key
     * @param {*} value
     * 
     * @memberOf Container
     */
    set(key, value) {
        this.items.set(key, value);
    }

    /**
     * 
     * @param {string} key
     * @returns
     * 
     * @memberOf Container
     */
    get(key) {
        if (!this.items.has(key)) {
            return null;
        }

        return this.items.get(key);
    }
}