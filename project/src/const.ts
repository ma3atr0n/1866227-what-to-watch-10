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
