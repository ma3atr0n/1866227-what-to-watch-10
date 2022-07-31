export enum AppRoute {
  Root = '/',
  SignIn = '/login',
  MyList ='/mylist',
  Films ='/films',
  AddReview ='review',
  Player ='/player',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum FilmTabName {
  Overview = 'OVERVIEW',
  Details = 'DETAILS',
  Reviews = 'REVIEWS'
}

export enum Genre {
  'All genres' = 'All genres',
  Comedy = 'Comedies',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Dramas',
  Horror = 'Horror',
  'Kids & Family' = 'Kids & Family',
  Romance = 'Romance',
  'Sci-Fi' = 'Sci-Fi',
  Thriller = 'Thrillers'
}
