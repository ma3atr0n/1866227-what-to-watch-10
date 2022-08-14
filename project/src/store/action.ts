import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, LoadingObject } from '../const';
import { Film, Films } from '../types/films';
import { Reviews } from '../types/reviews';
import { UserData } from '../types/user-data';

export const changeGenre = createAction('film/changegenre', (genre) => ({
  payload: genre
}));

export const setFilmsByGenre = createAction('film/setFilmsBygenre');

export const showMore = createAction('film/showMode');

export const resetFilmCount = createAction('film/resetFilmCount');

export const setFilms = createAction<Films>('api/setFilms');

export const setFilm = createAction<Film>('api/setFilm');

export const setUserData = createAction<UserData>('api/setUserData');

export const setFilmSimilar = createAction<Films>('api/setFilmSimilar');

export const setReviews = createAction<Reviews>('api/setReviews');

export const setDataLoadedStatus = createAction<boolean>('api/setDataLoadedStatus');

export const setLoadingObject = createAction<LoadingObject | null>('api/setLoadingObject');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorisation');

export const redirectToRoute = createAction<AppRoute | string>('browser/redirectToRoute');
