import { createSlice } from '@reduxjs/toolkit';
import { Genre, LoadingObject, NameSpace, SHOW_FILM_COUNT } from '../../const';
import { AppProcess } from '../../types/state';
import { fetchFilmAction, fetchFilmsAction } from '../api-action';

const initialState: AppProcess = {
  genre: Genre['All genres'],
  showCount: SHOW_FILM_COUNT,
  loadingObject: '' as LoadingObject,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeGenre: (state, action) => {
      state.genre = action.payload;
      state.showCount = SHOW_FILM_COUNT;
    },
    showMore: (state) => {
      state.showCount += SHOW_FILM_COUNT;
    },
    resetFilmCount: (state) => {
      state.showCount = SHOW_FILM_COUNT;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.loadingObject = LoadingObject.Films;
      })
      .addCase(fetchFilmsAction.fulfilled || fetchFilmsAction.rejected, (state) => {
        state.loadingObject = '' as LoadingObject;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.loadingObject = LoadingObject.Film;
      })
      .addCase(fetchFilmAction.fulfilled || fetchFilmsAction.rejected, (state) => {
        state.loadingObject = '' as LoadingObject;
      });
  }
});

export const {changeGenre, showMore, resetFilmCount} = appProcess.actions;


