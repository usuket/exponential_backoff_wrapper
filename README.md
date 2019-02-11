# exponential_backoff_wrapper

Simple exponential backoff wrapper

It will call a function repeatedly.

## install
```bash
npm install --save https://github.com/usuket/exponential_backoff_wrapper.git
```

```javascript
// js
const ExponentialRequestDriver = require("../src/index");
const driver = ExponentialRequestDriver.getInstance();
const axios = require("axios");

driver.run(axios.post, "URL_HEE").then(response => {
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
