import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, resetFilmCount, setFilmsByGenre, showMore } from './action';
import { Films } from '../types/films';
import { films } from '../mocks/films';
import { Genre, SHOW_FILM_COUNT } from '../const';

type InitialState ={
  genre: keyof typeof Genre,
  films: Films
  showCount: number
}

const initialState: InitialState = {
  genre: 'All genres',
  films: films,
  showCount: SHOW_FILM_COUNT
};

const reducer = createReducer(initialState, (bilder) => {
  bilder.addCase(changeGenre, (state, action) => {
    state.genre = action.payload;
    state.showCount = SHOW_FILM_COUNT;
  });
  bilder.addCase(setFilmsByGenre, (state) => {
    if(state.genre === Genre['All genres']) {
      state.films = films;
      return;
    }
    state.films = films.filter((film) => film.genre === state.genre);
  });
  bilder.addCase(showMore, (state) => {
    state.showCount += SHOW_FILM_COUNT;
  });
  bilder.addCase(resetFilmCount, (state) => {
    state.showCount = SHOW_FILM_COUNT;
  });
});

export {reducer};

