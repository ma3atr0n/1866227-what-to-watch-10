import { createSelector } from 'reselect';
import { Genre, NameSpace } from '../../const';
import { Film, Films } from '../../types/films';
import { State } from '../../types/state';
import { getGenre } from '../app-process/selectors';

export const getFilms = (state: State): Films => state[NameSpace.FilmData].films;

export const getFilm = (state: State): Film => state[NameSpace.FilmData].film;

export const getFilmPromo = (state: State): Film => state[NameSpace.FilmData].filmPromo;

export const getFilmsFavorite = (state: State): Films => state[NameSpace.FilmData].filmsFavorite;

export const getFilmsSimilar = (state: State): Films => state[NameSpace.FilmData].filmsSimilar;

export const filterFilmByGenre = createSelector(
  [getFilms, getGenre],
  (films, genre) => {
    if (genre === Genre['All genres']) {
      return films;
    }

    return films.filter((film) => film.genre === genre);
  }
);
