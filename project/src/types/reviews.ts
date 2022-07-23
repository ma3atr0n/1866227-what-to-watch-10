export type OneFilmReviews = {
  filmId: string,
  reviews: Review[]
}

export type Review = {
  reviewId: string,
  text: string,
  author: string,
  date: Date,
  reviewRate: number
}

export type FilmsReviews = OneFilmReviews[]
