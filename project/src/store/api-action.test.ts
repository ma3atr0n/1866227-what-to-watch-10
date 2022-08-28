import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { checkAuthAction, fetchFilmAction, fetchFilmPromoAction, fetchFilmsAction, fetchFilmsFavoriteAction, fetchFilmSimilarAction, fetchReviewsAction, loginAction, logoutAction, postFilmFavoriteStatusAction, postReviewsAction } from './api-action';
import { AuthData } from '../types/auth-data';
import { makeFakeFilm, makeFakeFilms, makeFakeFilmStatusFalse, makeFakeFilmStatusTrue, makeFakeFormData, makeFakeReviews, makeFakeUserData } from '../utils/mocks';
import { redirectToRoute } from './action';
import { UserData } from '../types/user-data';
import { Film, Films } from '../types/films';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const fakeUserData: UserData = makeFakeUserData();
  const fakeFilm: Film = makeFakeFilm();
  const fakeFilms: Films = makeFakeFilms();
  const fakeFilmStatusTrue = makeFakeFilmStatusTrue();
  const fakeFilmStatusFalse = makeFakeFilmStatusFalse();
  const fakeReviews = makeFakeReviews();
  const fakeFormData = makeFakeFormData();

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeUserData);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const action = store.getActions().map(({type}) => type);

    expect(action).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });
  it('should save token and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};
    Storage.prototype.setItem = jest.fn();

    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, fakeUserData);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction(fakeUser));

    const action = store.getActions().map(({type}) => type);

    expect(action).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('kino-token', fakeUserData.token);
  });
  it('should clear token and RedirectToRoute when POST /login', async () => {
    Storage.prototype.removeItem = jest.fn();

    const store = mockStore();
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logoutAction());

    const action = store.getActions().map(({type}) => type);

    expect(action).toEqual([
      logoutAction.pending.type,
      redirectToRoute.type,
      logoutAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('kino-token');
  });
  it('should load films when GET /films', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, fakeFilms);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFilmsAction());

    const action = store.getActions().map(({type}) => type);

    expect(action).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type,
    ]);
  });
  it('should load filmsFavorite when GET /favorite', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, fakeFilms);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFilmsFavoriteAction());

    const action = store.getActions().map(({type}) => type);

    expect(action).toEqual([
      fetchFilmsFavoriteAction.pending.type,
      fetchFilmsFavoriteAction.fulfilled.type,
    ]);
  });
  it('should load film when GET /films/id', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${APIRoute.Films}/${fakeFilm.id}`)
      .reply(200, fakeFilm);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFilmAction(fakeFilm.id.toString()));

    const action = store.getActions().map(({type}) => type);

    expect(action).toEqual([
      fetchFilmAction.pending.type,
      fetchFilmAction.fulfilled.type,
    ]);
  });
  it('should load similar films when GET /films/id/similar', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${APIRoute.Films}/${fakeFilm.id}/similar`)
      .reply(200, fakeFilms);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFilmSimilarAction(fakeFilm.id.toString()));

    const action = store.getActions().map(({type}) => type);

    expect(action).toEqual([
      fetchFilmSimilarAction.pending.type,
      fetchFilmSimilarAction.fulfilled.type,
    ]);
  });
  it('should load promo film when GET /promo', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, fakeFilm);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFilmPromoAction());

    const action = store.getActions().map(({type}) => type);

    expect(action).toEqual([
      fetchFilmPromoAction.pending.type,
      fetchFilmPromoAction.fulfilled.type,
    ]);
  });
  it('should set film facorite status true when POST /favorite/id/1', async () => {
    const store = mockStore();
    mockAPI
      .onPost(`${APIRoute.Favorite}/${fakeFilm.id.toString()}/1`)
      .reply(200, {...fakeFilm, isFavorite: true});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postFilmFavoriteStatusAction({...fakeFilmStatusTrue, filmId: fakeFilm.id}));

    const action = store.getActions().map(({type}) => type);

    expect(action).toEqual([
      postFilmFavoriteStatusAction.pending.type,
      postFilmFavoriteStatusAction.fulfilled.type,
    ]);
  });
  it('should set film facorite status false when POST /favorite/id/0', async () => {
    const store = mockStore();
    mockAPI
      .onPost(`${APIRoute.Favorite}/${fakeFilm.id.toString()}/0`)
      .reply(200, {...fakeFilm, isFavorite: false});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postFilmFavoriteStatusAction({...fakeFilmStatusFalse, filmId: fakeFilm.id}));

    const action = store.getActions().map(({type}) => type);

    expect(action).toEqual([
      postFilmFavoriteStatusAction.pending.type,
      postFilmFavoriteStatusAction.fulfilled.type,
    ]);
  });
  it('should load reviews when GET /promo', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${APIRoute.Comments}/${fakeFilm.id}`)
      .reply(200, fakeReviews);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchReviewsAction(fakeFilm.id.toString()));

    const action = store.getActions().map(({type}) => type);

    expect(action).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });
  it('should post review and redirectToRoute when POST /comments/id', async () => {
    const store = mockStore();
    mockAPI
      .onPost(`${APIRoute.Comments}/${fakeFormData.filmId}`)
      .reply(200, fakeReviews);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postReviewsAction(fakeFormData));

    const action = store.getActions().map(({type}) => type);

    expect(action).toEqual([
      postReviewsAction.pending.type,
      redirectToRoute.type,
      postReviewsAction.fulfilled.type,
    ]);
  });
});
