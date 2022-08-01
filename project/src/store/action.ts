import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction('film/changegenre', (genre) => ({
  payload: genre
}));

export const setFilmsByGenre = createAction('film/setFilmsBygenre');

export const showMore = createAction('film/showMode');

export const resetFilmCount = createAction('film/resetFilmCount');

export const setFilms = createAction('film/setFilms');
