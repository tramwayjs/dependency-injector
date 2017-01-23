import Container from './container/Container';
import MapFactory from './MapFactory';

export default class ParametersManager {
    constructor(parameters) {
        this.env = process.env.NODE_ENV;
        parameters = MapFactory.create(parameters, true);
        parameters = this.unifyConfig(parameters);
        this.parameters = new Container(parameters);
    }    

    get(key, asMap) {
        if (key) {
            let value = this.parameters.get(key);
            if (!asMap) {
                return MapFactory.convertToObject(value);
            }
            return value;
        }

        return this.parameters;
    }

    /**
     * @returns {string}
     * 
     * @memberOf ParametersManager
     */
    getEnv() {
        return this.env;
    }

    /**
     * @param {Map<string, Map>} config
     * @returns {Map<string, Map>}
     * 
     * @memberOf ParametersManager
     */
    unifyConfig(config) {
        if (!config.has(this.env)) {
            return config.get('global');
        }

        return this.recursiveUnification(config.get('global'), config.get(this.env));
    }

    /**
     *
     * @param {Map<string, Map>} defaultConfig
     * @param {Map<string, Map>} envConfig
     * @returns {Map<string, Map>}
     * 
     * @memberOf ParametersManager
     */
    recursiveUnification(globalConfig, envConfig) {
        if (!(globalConfig instanceof Map)) {
            return envConfig;
        }

        for (let [key, value] of envConfig) {
            if (!globalConfig.has(key)) {
                globalConfig.set(key, value);
            } else {
                globalConfig.set(key, this.recursiveUnification(globalConfig.get(key), value))
            }
        }

        return globalConfig;
    }
}