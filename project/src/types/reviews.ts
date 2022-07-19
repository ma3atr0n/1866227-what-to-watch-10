export type FilmReviews = {
  filmId: string,
  reviews: Review[]
}

export type Review = {
  reviewId: string,
  text: string,
  author: string,
  date: string,
  reviewRate: number
}

export type FilmsReviews = FilmReviews[]
