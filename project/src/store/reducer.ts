import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, resetFilmCount, setFilms, setFilmsByGenre, showMore } from './action';
import { Films } from '../types/films';
import { films } from '../mocks/films';
import { Genre, SHOW_FILM_COUNT } from '../const';

type InitialState ={
  genre: keyof typeof Genre,
  filmsByGenre: Films,
  showCount: number,
  films: Films,
}

const initialState: InitialState = {
  genre: 'All genres',
  filmsByGenre: films,
  showCount: SHOW_FILM_COUNT,
  films: films,
};

const reducer = createReducer(initialState, (bilder) => {
  bilder.addCase(changeGenre, (state, action) => {
    state.genre = action.payload;
    state.showCount = SHOW_FILM_COUNT;
  });
  bilder.addCase(setFilmsByGenre, (state) => {
    if(state.genre === Genre['All genres']) {
      state.filmsByGenre = films;
      return;
    }
    state.filmsByGenre = films.filter((film) => film.genre === state.genre);
  });
  bilder.addCase(showMore, (state) => {
    state.showCount += SHOW_FILM_COUNT;
  });
  bilder.addCase(resetFilmCount, (state) => {
    state.showCount = SHOW_FILM_COUNT;
  });
  bilder.addCase(setFilms, (state) => {
    state.films = films;
  });
});

export {reducer};

