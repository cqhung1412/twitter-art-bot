const quotes = function () {
  this.QUOTES = [
    "Princess Jasmine playing a video game and winning in a bustling modern city, Sketch, Hyperrealistic",
    "Snow White playing football and winning in a winery, Sketch",
    "A camera being licked by a sloth in a museum, Baroque painting, Hyperrealistic",
    "A goblin learning to fly in a restaurant, Portrait",
    "Darth Vader learning to fly in an alien spaceship, On the television show The Brady Bunch, Award winning",
    "Cleopatra wearing fancy purple pants holding avocados in a tree, Go pro footage, 4K HD",
    "A cigarette covered in cheese in a beauty salon, Movie Poster",
    "Winnie the Pooh wearing combat boots and a brand new gold t-shirt drinking a mug of beer in a zoo, Book cover",
    "An elf learning to fly in a submarine, Painting by Leonardo Da Vinci",
    "Harry Potter playing with a cigarette and losing in a plain, Painting by Pablo Picasso",
    "Painting of a dachshund drinking water in the style of Van Gogh",
  ];
};

const getQuotes = () => {
  const newQuotes = new quotes();
  return newQuotes.QUOTES[Math.floor(Math.random() * newQuotes.QUOTES.length)];
};

module.exports = { getQuotes };
