import { Film } from '../../types/films';
import { FilmData } from '../../types/state';
import { makeFakeFavoriteFilm, makeFakeFilm, makeFakeFilms, makeFakeNoFavoriteFilm } from '../../utils/mocks';
import { fetchFilmAction, fetchFilmPromoAction, fetchFilmsAction, fetchFilmsFavoriteAction, fetchFilmSimilarAction, postFilmFavoriteStatusAction } from '../api-action';
import { clearFavorites, filmData } from './film-data';

const initialState: FilmData = {
  films: [],
  film: {} as Film,
  filmsSimilar: [],
  filmsFavorite: [],
  filmPromo: {} as Film,
};

const fakeFilms = makeFakeFilms();
const fakeFilm = makeFakeFilm();
const fakeFavoriteFilm = makeFakeFavoriteFilm();
const fakeNoFavoriteFilm = makeFakeNoFavoriteFilm();

describe('Reducer: film-data', () => {
  let state: FilmData;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(filmData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });
  it('should clear filmsFavorite', () => {
    state = {...initialState, filmsFavorite: fakeFilms};
    expect(filmData.reducer(state, clearFavorites()))
      .toEqual(initialState);
  });

  describe('fetchFilmsAction test', () => {
    it('should update films to payload if fetchFilmsAction fulfilled', () => {
      expect(filmData.reducer(state, {type: fetchFilmsAction.fulfilled.type, payload: fakeFilms}))
        .toEqual({...initialState, films: fakeFilms});
    });
    it('should update films to payload if fetchFilmsAction rejected', () => {
      expect(filmData.reducer(state, {type: fetchFilmsAction.rejected.type}))
        .toEqual(initialState);
    });
  });

  describe('fetchFilmsFavoriteAction test', () => {
    it('should update filmsFavorite to payload if fetchFilmsFavoriteAction fulfilled', () => {
      expect(filmData.reducer(state, {type: fetchFilmsFavoriteAction.fulfilled.type, payload: fakeFilms}))
        .toEqual({...initialState, filmsFavorite: fakeFilms});
    });
    it('should update filmsFavorite to empty array if fetchFilmsFavoriteAction rejected', () => {
      state = {...initialState, filmsFavorite: fakeFilms};
      expect(filmData.reducer(state, {type: fetchFilmsFavoriteAction.rejected.type}))
        .toEqual(initialState);
    });
  });

  describe('fetchFilmAction test', () => {
    it('should update film to payload if fetchFilmAction fulfilled', () => {
      expect(filmData.reducer(state, {type: fetchFilmAction.fulfilled.type, payload: fakeFilm}))
        .toEqual({...initialState, film: fakeFilm});
    });
  });

  describe('fetchFilmSimilarAction test', () => {
    it('should update filmsSimilar to payload if fetchFilmSimilarAction fulfilled', () => {
      expect(filmData.reducer(state, {type: fetchFilmSimilarAction.fulfilled.type, payload: fakeFilms}))
        .toEqual({...initialState, filmsSimilar: fakeFilms});
    });
  });

  describe('fetchFilmPromoAction test', () => {
    it('should update filmPromo to payload if fetchFilmPromoAction fulfilled', () => {
      expect(filmData.reducer(state, {type: fetchFilmPromoAction.fulfilled.type, payload: fakeFilm}))
        .toEqual({...initialState, filmPromo: fakeFilm});
    });
  });

  describe('postFilmFavoriteStatusAction test', () => {
    it('should add film to favorite if postFilmFavoriteStatusAction fulfilled and film not exist', () => {
      state = {...initialState, filmsFavorite: fakeFilms};
      expect(filmData.reducer(state, {type: postFilmFavoriteStatusAction.fulfilled.type, payload: fakeFavoriteFilm}))
        .toEqual({...initialState, filmsFavorite: [...fakeFilms, fakeFavoriteFilm]});
    });
    it('should update film in favorite if postFilmFavoriteStatusAction fulfilled and film exist', () => {
      state = {...initialState, filmsFavorite: [...fakeFilms, fakeFavoriteFilm]};
      expect(filmData.reducer(state, {type: postFilmFavoriteStatusAction.fulfilled.type, payload: fakeFavoriteFilm}))
        .toEqual({...initialState, filmsFavorite: [...fakeFilms, fakeFavoriteFilm]});
    });
    it('should delete no favorite film from filmsFavorite if postFilmFavoriteStatusAction fulfilled and film exist but film not favorite', () => {
      state = {...initialState, filmsFavorite: [...fakeFilms, fakeNoFavoriteFilm]};
      expect(filmData.reducer(state, {type: postFilmFavoriteStatusAction.fulfilled.type, payload: fakeNoFavoriteFilm}))
        .toEqual({...initialState, filmsFavorite: [...fakeFilms]});
    });
  });

});
