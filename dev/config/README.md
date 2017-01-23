# Config

Here is where you will find configuration hooks for core components.

## cors - cors.js
By default the cors configuration will enable [cors](https://github.com/expressjs/cors) for all requests.

```
import cors from 'cors';

export default cors();
```

To add options like origin or preflight, change the exported cors call accordingly.

### A simple origin

```
import cors from 'cors';
var options = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
export default cors(options);

```

### A dynamic origin

```
import cors from 'cors';
var whitelist = ['http://example1.com', 'http://example2.com'];
var options = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
  }
};
export default cors(options);
```

### Pre-flight requests
Add CORS to the options route.