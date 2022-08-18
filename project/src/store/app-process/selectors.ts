import { Genre, LoadingObject, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getGenre = (state: State): Genre => state[NameSpace.App].genre;

export const getLoadingObject = (state: State): LoadingObject => state[NameSpace.App].loadingObject;

export const getShowCount = (state: State): number => state[NameSpace.App].showCount;
