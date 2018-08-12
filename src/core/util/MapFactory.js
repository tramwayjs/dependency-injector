/**
 * 
 * @export
 * @class MapFactory
 */
export default class MapFactory {
    
    /**
     * @static
     * @param {Object} obj
     * @param {boolean} isRecursive
     * @returns
     * 
     * @memberOf MapFactory
     */
    static create(obj, isRecursive = false) {
        if (!typeof obj === "object") {
            return isRecurive ? obj : null;
        }

        let map = new Map();

        Object.keys(obj).forEach(key => {
            let value = obj[key];
            if (isRecursive && typeof value === "object") {
                value = MapFactory.create(value, true);
            }

            map.set(key, value);
        });

        return map;
    }

    /**
     * 
     * @param {Map<string, *>} value
     * @param {boolean} isRecursive
     * @returns {Object}
     * 
     * @memberOf MapFactory
     */
    static convertToObject(value, isRecursive) {
        if (!(value instanceof Map)) {
            return value;
        }

        let obj = {};

        for (let [k, v] of value) {
            if (isRecursive && v instanceof Map) {
                v = MapFactory.convertToObject(v, true);
            }

            obj[k] = v;
        }

        return obj;
    }
}