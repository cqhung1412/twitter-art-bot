const { postTweet } = require('./utils/bot');
const { getQuotes } = require('./utils/quotes');

const CronJob = require('cron').CronJob;

const cronJob = new CronJob(
  '0 7 * * *', // everyday at 7 am
  function () {
    postTweet(getQuotes())
  },
  null,
  true,
  'Asia/Ho_Chi_Minh'
)

console.log(cronJob.running)