import RestAPIConnection from 'tramway-connection-rest-api';
import ParametersManager from '../core/ParametersManager';

/**
 * This class isn't necessary, except if you want to abstract configuration logic and not have it in the Model or override some of RestAPIConnection's methods.
 * 
 * @export
 * @class ExampleAPIWrapperConnection
 * @extends {RestAPIConnection}
 */
export default class ExampleAPIWrapperConnection extends RestAPIConnection {
    constructor() {
        super(ParametersManager.get('exampleAPI'));
    }
}