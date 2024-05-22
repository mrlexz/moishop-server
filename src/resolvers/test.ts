import db from "../../data/_data.js";

export default {
  Query: {
    games: () => {
      return db.games;
    },
    reviews: () => {
      return db.reviews;
    },
    authors: () => {
      return db.authors;
    },
    review: (_, args) => {
      return db.reviews.find((review) => review.id === args.id);
    },
  },
};
