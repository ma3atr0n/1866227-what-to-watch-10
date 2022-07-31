import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, setFilmsByGenre } from './action';
import { Films } from '../types/films';
import { films } from '../mocks/films';
import { Genre } from '../const';

type InitialState ={
  genre: keyof typeof Genre,
  films: Films
}

const initialState: InitialState = {
  genre: 'All genres',
  films: films
};

const reducer = createReducer(initialState, (bilder) => {
  bilder.addCase(changeGenre, (state, action) => {
    state.genre = action.payload;
  });
  bilder.addCase(setFilmsByGenre, (state) => {
    if(state.genre === Genre['All genres']) {
      state.films = films;
      return;
    }
    state.films = films.filter((film) => film.genre === state.genre);
  });
});

export {reducer};

