const ExponentialRequestDriver = require("../src/index");

const axios = require("axios");
const fetch = require("node-fetch");

const driver = ExponentialRequestDriver.getInstance({
  limit: 3,
  weight: function () {
    return this.retryCount * 1000
  }
});

async function main() {
  const option = {
    params: {
      param1: "aaa",
      param2: "bbb",
    }
  };

  try {
    // GOOD - use fetch
    const url = "http://ptsv2.com/t/4an40-1549871148/post";
    const fetch_response = await driver.run(fetch, url);
    console.log("fetch_response", JSON.stringify(fetch_response));

    // GOOD2 - use axios RECOMMENDED
    const response = await driver.run(axios.post, url, option);
    console.log("response", response.data);

    // Error
    await driver.run(axios.post, "http://xxxx/post", option);
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);
