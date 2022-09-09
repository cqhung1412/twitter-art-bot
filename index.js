const { postTweet } = require("./utils/bot");
const { getQuotes } = require("./utils/quotes");

postTweet(getQuotes());
