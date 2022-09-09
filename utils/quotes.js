const quotes = function () {
  this.QUOTES = [
    "a painting of a fox sitting in a field at sunrise in the style of Claude Monet",
    "TeStiNg AutO bOt",
  ];
};

function getQuotes() {
  const newQuotes = new quotes();
  return newQuotes.QUOTES[Math.floor(Math.random() * newQuotes.QUOTES.length)];
}

module.exports = { getQuotes };
