import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, requireAuthorization, resetFilmCount, setDataLoadedStatus, setFilm, setFilms, setFilmsByGenre, setFilmSimilar, setLoadingObject, setReviews, setUserData, showMore } from './action';
import { Film, Films } from '../types/films';
import { AuthorizationStatus, Genre, LoadingObject, SHOW_FILM_COUNT } from '../const';
import { UserData } from '../types/user-data';
import { Reviews } from '../types/reviews';

type InitialState ={
  genre: keyof typeof Genre,
  filmsByGenre: Films,
  showCount: number,
  films: Films,
  film: Film | null,
  filmSimilar: Films,
  reviews: Reviews,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  loadingObject: LoadingObject | null,
  userData: UserData,
}

const initialState: InitialState = {
  genre: 'All genres',
  filmsByGenre: [],
  showCount: SHOW_FILM_COUNT,
  films: [],
  film: null,
  filmSimilar: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: true,
  loadingObject: null,
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
    .addCase(setFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(setFilmSimilar, (state, action) => {
      state.filmSimilar = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setLoadingObject, (state, action) => {
      state.loadingObject = action.payload;
    });
});

export {reducer};

