# exponential_backoff_wrapper

[![CircleCI](https://circleci.com/gh/usuket/exponential_backoff_wrapper/tree/master.svg?style=svg)](https://circleci.com/gh/usuket/exponential_backoff_wrapper/tree/master)

Simple exponential backoff wrapper.  
Accept various type of http request libraries.  
 
## install
```bash
npm install --save https://github.com/usuket/exponential_backoff_wrapper.git
```

## maintenance
```bash
npm test
npm lint
```

```javascript
// js
const ExponentialRequestDriver = require("exponential_backoff_wrapper");
const driver = ExponentialRequestDriver.getInstance();
const axios = require("axios");

// It will call a function repeatedly.
driver.run(axios.post, "URL_HERE").then(response => {
  console.log(response)
}).catch(err =>{
  console.log(err);
});
```


## default back off strategy

- Default limit is 5. It will attempt 5 times
- Waiting duration is (count * count) * 1000 mill sec<br>
  0, 1, 2, 9, 16, 25, 36, .... 100 sec


## run example
```
node example/example.js
```
