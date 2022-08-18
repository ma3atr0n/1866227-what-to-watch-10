import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Film, Films } from '../../types/films';
import { FilmData } from '../../types/state';
import { fetchFilmAction, fetchFilmPromoAction, fetchFilmsAction, fetchFilmsFavoriteAction, fetchFilmSimilarAction, postFilmFavoriteStatusAction } from '../api-action';

const initialState: FilmData = {
  films: [],
  film: {} as Film,
  filmsSimilar: [],
  filmsFavorite: [],
  filmPromo: {} as Film,
};

const getIndex = (films: Films, film: Film): number => {
  const index = films.findIndex((elem) => elem.id === film.id);
  return index;
};


export const filmData = createSlice({
  name: NameSpace.FilmData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
      })
      .addCase(fetchFilmsFavoriteAction.fulfilled, (state, action) => {
        state.filmsFavorite = action.payload;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(fetchFilmSimilarAction.fulfilled, (state, action) => {
        state.filmsSimilar = action.payload;
      })
      .addCase(fetchFilmPromoAction.fulfilled, (state, action) => {
        state.filmPromo = action.payload;
      })
      .addCase(postFilmFavoriteStatusAction.fulfilled, (state, action) => {
        const index = getIndex(state.filmsFavorite, action.payload);
        if(action.payload.isFavorite && index > -1) {
          state.filmsFavorite = [...state.filmsFavorite.slice(0, index), action.payload, ...state.filmsFavorite.slice(index + 1)];
        }

        if(action.payload.isFavorite && index === -1) {
          state.filmsFavorite = [...state.filmsFavorite, action.payload];
        }

        if(action.payload.isFavorite === false && index > -1) {
          state.filmsFavorite.splice(index, 1);
        }
      });
  }
});

