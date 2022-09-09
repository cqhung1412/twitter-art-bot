const quotes = function () {
  this.QUOTES = ["Testing auto bot", "TeStiNg AutO bOt"];
};

function getQuotes() {
  const newQuotes = new quotes();
  return newQuotes.QUOTES[Math.floor(Math.random() * newQuotes.QUOTES.length)];
}

module.exports = { getQuotes };
