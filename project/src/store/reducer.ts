import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, requireAuthorization, resetFilmCount, setDataLoadedStatus, setError, setFilms, setFilmsByGenre, showMore } from './action';
import { Films } from '../types/films';
//import { films } from '../mocks/films';
import { AuthorizationStatus, Genre, SHOW_FILM_COUNT } from '../const';
import { Error } from '../types/error';

type InitialState ={
  genre: keyof typeof Genre,
  filmsByGenre: Films,
  showCount: number,
  films: Films,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  error: Error
}

const initialState: InitialState = {
  genre: 'All genres',
  filmsByGenre: [],
  showCount: SHOW_FILM_COUNT,
  films: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: true,
  error: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
      state.showCount = SHOW_FILM_COUNT;
    })
    .addCase(setFilmsByGenre, (state) => {
      if(state.genre === Genre['All genres']) {
        state.filmsByGenre = state.films;
        return;
      }
      state.filmsByGenre = state.films.filter((film) => film.genre === state.genre);
    })
    .addCase(showMore, (state) => {
      state.showCount += SHOW_FILM_COUNT;
    })
    .addCase(resetFilmCount, (state) => {
      state.showCount = SHOW_FILM_COUNT;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});

export {reducer};

