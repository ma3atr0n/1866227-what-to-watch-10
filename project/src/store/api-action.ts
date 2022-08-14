import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus, LoadingObject} from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Film, Films } from '../types/films';
import { FormData } from '../types/form-data';
import { Reviews } from '../types/reviews';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { redirectToRoute, requireAuthorization, setDataLoadedStatus, setFilm, setFilms, setFilmsByGenre, setFilmSimilar, setLoadingObject, setReviews, setUserData } from './action';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/getFilms',
  async(_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setDataLoadedStatus(true));
      const {data} = await api.get<Films>(APIRoute.Films);
      dispatch(setFilms(data));
      dispatch(setFilmsByGenre());
    } finally {
      dispatch(setDataLoadedStatus(false));
    }
  }
);

export const fetchFilmAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/getFilm',
  async(id, {dispatch, extra: api}) => {
    try {
      dispatch(setLoadingObject(LoadingObject.Film));
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      dispatch(setFilm(data));
    } finally {
      dispatch(setLoadingObject(null));
    }
  }
);
export const fetchFilmSimilarAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/FilmSimilar',
  async(id, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(`${APIRoute.Films}/${id}/similar`);
    dispatch(setFilmSimilar(data));
  }
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/getReviews',
  async(id, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Comments}/${id}`);
    dispatch(setReviews(data));
  }
);

export const postReviewsAction = createAsyncThunk<void, FormData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postReviews',
  async({filmId, rating, comment}, {dispatch, extra: api}) => {
    await api.post<FormData>(`${APIRoute.Comments}/${filmId}`, {rating, comment});
    dispatch(redirectToRoute(`${APIRoute.Films}/${filmId}`));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async(_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async(_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);
