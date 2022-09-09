require("dotenv").config();
const Twit = require("twit");

const {
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
} = process.env;

// Twit client init
const client = new Twit({
  consumer_key: TWITTER_API_KEY,
  consumer_secret: TWITTER_API_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
});

/**
 * Post Tweet Function
 */
const postTweet = (message) => {
  return client
    .post("statues/update", {
      status: message,
    })
    .then((res) => {
      console.log("Tweet successfully.", res);
    })
    .catch((err) => {
      console.log("Tweet failed.", err);
    });
};

module.exports = { postTweet };
