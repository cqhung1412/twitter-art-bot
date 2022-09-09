require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

const {
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
} = process.env;

// Twit client init
const client = new TwitterApi({
  appKey: TWITTER_API_KEY,
  appSecret: TWITTER_API_SECRET,
  accessToken: TWITTER_ACCESS_TOKEN,
  accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
});

/**
 * Post Tweet Function
 */
const postTweet = (message) => {
  return client.v1.tweet(message)
    .then((res) => {
      console.log("Tweet successfully.", message);
    })
    .catch((err) => {
      console.log("Tweet failed.", err);
    });
};

module.exports = { postTweet };
