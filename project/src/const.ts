export const SHOW_FILM_COUNT = 8;

export const TIMEOUT_SHOW_ERROR = 2000;

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

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}
