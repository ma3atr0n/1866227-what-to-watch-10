import { AuthorizationStatus, Genre, LoadingObject } from '../const';
import {store} from '../hooks/index';
import { Film, Films } from './films';
import { Reviews } from './reviews';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userData: UserData,
}

export type FilmData = {
  films: Films,
  film: Film,
  filmsSimilar: Films,
  filmsFavorite: Films,
  filmPromo: Film,
};

export type ReviewData = {
  reviews: Reviews,
};

export type AppProcess = {
  genre: Genre,
  showCount: number,
  loadingObject: LoadingObject,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
