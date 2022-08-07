import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Error } from '../types/error';
import { Films } from '../types/films';

export const changeGenre = createAction('film/changegenre', (genre) => ({
  payload: genre
}));

export const setFilmsByGenre = createAction('film/setFilmsBygenre');

export const showMore = createAction('film/showMode');

export const resetFilmCount = createAction('film/resetFilmCount');

export const setFilms = createAction<Films>('api/getFilms');

export const setError = createAction<Error>('api/setError');

export const setDataLoadedStatus = createAction<boolean>('api/setDataLoadedStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorisation');
