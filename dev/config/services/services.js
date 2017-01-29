import RestAPIConnection from 'tramway-connection-rest-api';
import RandomClass from '../../connections/RandomClass';

export default {
    "randomclass": {
        "class": RandomClass,
        "constructor": [1, 2]
    },
    "exampleapiconnection": {
        "class": RestAPIConnection,
        "constructor": [{"type": "parameter", "key": "exampleAPI"}]
    },
    "ad": {
        "class": RandomClass,
        "functions": [
            {
                "function": "setC",
                "args": [{"type": "parameter", "key": "exampleAPI"}]
            }
        ]
    },
    "ad2": {
        "class": RandomClass,
        "functions": [
            {
                "function": "setC",
                "args": [{"type": "service", "key": "ad"}]
            }
        ]
    }
};