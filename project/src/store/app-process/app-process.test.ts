import { Genre, LoadingObject, SHOW_FILM_COUNT } from '../../const';
import { AppProcess } from '../../types/state';
import { fetchFilmAction, fetchFilmsAction } from '../api-action';
import { appProcess, changeGenre, resetFilmCount, showMore } from './app-process';

const initialState: AppProcess = {
  genre: Genre['All genres'],
  showCount: SHOW_FILM_COUNT,
  loadingObject: '' as LoadingObject,
};
describe('Reducer: app', () => {
  let state: AppProcess;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change Genre, update genre to payload and set showCount to SHOW_FILM_COUNT', () => {
    expect(appProcess.reducer(state, changeGenre(Genre['All genres'])))
      .toEqual({genre: Genre['All genres'], loadingObject: '', showCount: SHOW_FILM_COUNT});
  });

  it('should increase showCounter for showCounter + SHOW_FILM_COUNT', () => {
    expect(appProcess.reducer(state, showMore()))
      .toEqual({genre: Genre['All genres'], loadingObject: '', showCount: SHOW_FILM_COUNT * 2});
  });

  it('should reset film count, set showCount to SHOW_FILM_COUNT', () => {
    expect(appProcess.reducer(state, resetFilmCount()))
      .toEqual({genre: Genre['All genres'], loadingObject: '', showCount: SHOW_FILM_COUNT});
  });

  describe('fetchFilmsAction test', () => {
    it('should set loadingObject to LoadingObject.Films if fetchFilmsAction pending', () => {
      expect(appProcess.reducer(state, {type: fetchFilmsAction.pending.type}))
        .toEqual({genre: Genre['All genres'], loadingObject: LoadingObject.Films, showCount: SHOW_FILM_COUNT});
    });
    it('should set loadingObject to \'\' if fetchFilmsAction fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchFilmsAction.fulfilled.type}))
        .toEqual({genre: Genre['All genres'], loadingObject: '', showCount: SHOW_FILM_COUNT});
    });
    it('should set loadingObject to \'\' if fetchFilmsAction rejected', () => {
      expect(appProcess.reducer(state, {type: fetchFilmsAction.rejected.type}))
        .toEqual({genre: Genre['All genres'], loadingObject: '', showCount: SHOW_FILM_COUNT});
    });
  });

  describe('fetchFilmAction test', () => {
    it('should set loadingObject to LoadingObject.Film if fetchFilmAction pending', () => {
      expect(appProcess.reducer(state, {type: fetchFilmAction.pending.type}))
        .toEqual({genre: Genre['All genres'], loadingObject: LoadingObject.Film, showCount: SHOW_FILM_COUNT});
    });
    it('should set loadingObject to \'\' if fetchFilmAction fulfilled', () => {
      expect(appProcess.reducer(state, {type: fetchFilmAction.fulfilled.type}))
        .toEqual({genre: Genre['All genres'], loadingObject: '', showCount: SHOW_FILM_COUNT});
    });
    it('should set loadingObject to \'\' if fetchFilmAction rejected', () => {
      expect(appProcess.reducer(state, {type: fetchFilmAction.rejected.type}))
        .toEqual({genre: Genre['All genres'], loadingObject: '', showCount: SHOW_FILM_COUNT});
    });
  });
});
