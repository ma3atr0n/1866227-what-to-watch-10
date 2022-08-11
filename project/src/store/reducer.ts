import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, requireAuthorization, resetFilmCount, setDataLoadedStatus, setFilms, setFilmsByGenre, setUserData, showMore } from './action';
import { Films } from '../types/films';
import { AuthorizationStatus, Genre, SHOW_FILM_COUNT } from '../const';
import { UserData } from '../types/user-data';

type InitialState ={
  genre: keyof typeof Genre,
  filmsByGenre: Films,
  showCount: number,
  films: Films,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  userData: UserData
}

const initialState: InitialState = {
  genre: 'All genres',
  filmsByGenre: [],
  showCount: SHOW_FILM_COUNT,
  films: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: true,
  userData: {avatarUrl: '', email: '', id: -1, name: '', token: ''},
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
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});

export {reducer};

