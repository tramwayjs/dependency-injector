import RestAPIConnection from 'tramway-connection-rest-api';
import RandomClass from '../../connections/RandomClass';

export default {
    "randomclass": {
        "class": RandomClass,
        "constructor": [1, 2]
    },
    "exampleapiconnection": {
        "class": RandomClass,
        "constructor": ["parameters.exampleAPI", [2]],
        "functions": [
            {
                "function": "setC",
                "args": [5]
            }
        ]
    },
    "ad": {
        "class": RandomClass,
        "functions": [
            {
                "function": "setC",
                "args": [5]
            }
        ]
    }
};