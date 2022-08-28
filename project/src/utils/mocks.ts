import { system, name, internet, datatype } from 'faker';
import { Genre } from '../const';
import { FilmStatus } from '../types/film-status';
import { Film, Films } from '../types/films';
import { Review, Reviews } from '../types/reviews';
import { UserData } from '../types/user-data';
import { FormData } from '../types/form-data';

export const makeFakeUserData = (): UserData => ({
  avatarUrl: system.filePath(),
  email: internet.email(),
  id: datatype.number(),
  name: name.title(),
  token: datatype.string(),
} as UserData);

export const makeFakeFilm = (): Film => ({
  id: datatype.number(),
  name: name.title(),
  posterImage: system.filePath(),
  previewImage: system.filePath(),
  backgroundImage: system.filePath(),
  backgroundColor: system.filePath(),
  videoLink: system.filePath(),
  previewVideoLink: system.filePath(),
  description: 'asdasdasdasdasdasdasdsad',
  rating: datatype.number(),
  scoresCount: datatype.number(),
  director: name.findName(),
  starring: new Array(3).fill(null).map(() => name.findName()),
  runTime: datatype.number(),
  genre: Genre['All genres'],
  released: datatype.number(),
  isFavorite: datatype.boolean(),
} as Film);

export const makeFakeReview = (): Review => ({
  comment: 'asdasdasdasdasdasdasdsad',
  date: '2020-01-01',
  id: datatype.number(),
  rating: datatype.number(),
  user: {
    id: datatype.number(),
    name: name.title()
  }
} as Review);

export const makeFakeFilmStatusTrue = (): FilmStatus => ({
  filmId: datatype.number(),
  status: 1,
} as FilmStatus);

export const makeFakeFormData = (): FormData => ({
  filmId: '1',
  comment: 'asdasdasdasdasdasdasdsad',
  rating: datatype.number(),
} as FormData);

export const makeFakeFilmStatusFalse = (): FilmStatus => ({...makeFakeFilmStatusTrue(), status: 0});

export const makeFakeFavoriteFilm = (): Film => ({...makeFakeFilm(), isFavorite: true});

export const makeFakeNoFavoriteFilm = (): Film => ({...makeFakeFilm(), isFavorite: false});

export const makeFakeFilms = (): Films => new Array(3).fill(null).map(() => makeFakeFilm());

export const makeFakeReviews = (): Reviews => new Array(3).fill(null).map(() => makeFakeReview());
