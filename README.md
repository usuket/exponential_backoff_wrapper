# exponential_backoff_wrapper

Simple exponential backoff wrapper

It will call a function repeatedly.


## default back off strategy

- Default limit is 5. It will attempt 5 times
- Waiting duration is (count * count) * 1000 mill sec<br>
  0, 1, 2, 9, 16, 25, 36, .... 100 sec


## run example
```
node example/example.js
```
