const test = require("ava");
const ExponentialRequestDriver = require("../src/index");
const axios = require("axios");
const driver = ExponentialRequestDriver.getInstance({limit: 2});
const http = require("http");
const mockserver = require('mockserver');

const PORT = 9001;
const host = `http://localhost:${PORT}/`;
// https://www.npmjs.com/package/mockserver
//
/**
 * this mock server refer to .mocks directory.
 */
http.createServer(mockserver('.mocks')).listen(PORT);

test("get", async t => {
  await driver.run(axios.get, host + "example").then(ret => {
    t.is(ret.status, 200);
    t.is(ret.data.text, "ok");
  }).catch(err => {
    console.error(err);
    t.fail();
  });
});

test("post", async t => {
  const param = {param: "param"};
  await driver.run(axios.post, host + "example", param).then(ret => {
    t.is(ret.config.data, JSON.stringify(param)); // test param has been passed or not.
    t.is(ret.status, 200);
    t.is(ret.data.text, "ok");
  }).catch(err => {
    console.error(err);
    t.fail();
  });
});

test("retry", async t => {
  await driver.run(axios.get, host + "error").catch(err => {
    t.pass("retry passed");
  });
});