// Mockup data for Game type
const games = [
  {
    id: "1",
    title: "The Witcher 3: Wild Hunt",
    platform: ["PlayStation 4", "Xbox One", "PC"],
  },
  {
    id: "2",
    title: "Red Dead Redemption 2",
    platform: ["PlayStation 4", "Xbox One"],
  },
  {
    id: "3",
    title: "The Legend of Zelda: Breath of the Wild",
    platform: ["Nintendo Switch", "Wii U"],
  },
  // Add more game records here...
];

// Mockup data for Review type
const reviews = [
  {
    id: "1",
    rating: 5,
    comment: "Amazing game, loved every moment of it!",
  },
  {
    id: "2",
    rating: 4,
    comment: "Great graphics and storyline, but some bugs need fixing.",
  },
  {
    id: "3",
    rating: 4,
    comment: "Solid gameplay mechanics, but the story could have been better.",
  },
  // Add more review records here...
];

// Mockup data for Author type
const authors = [
  {
    id: "1",
    name: "John Doe",
    verified: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    verified: true,
  },
  {
    id: "3",
    name: "David Johnson",
    verified: false,
  },
  // Add more author records here...
];

export default { games, reviews, authors };
