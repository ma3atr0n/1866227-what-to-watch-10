import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction('film/changegenre', (genre) => ({
  payload: genre
}));

export const setFilmsByGenre = createAction('film/getFilmsBygenre');
