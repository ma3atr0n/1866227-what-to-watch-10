
import {Films} from '../../types/films';
import FilmCard from '../../components/film-card/film-card';
// import { useState } from 'react';
// import { VideoPlayer } from '../video-player/video-player';

type FilmListProps = {
  films: Films
  genre?: string,
  count?: number
}

function FilmList({films, genre, count = 4}: FilmListProps): JSX.Element {
  if (genre) {
    const filmsBygenre = films.filter((film) => film.genre === genre).slice(0,count);
    films = filmsBygenre;
  }

  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.id} film={film}/>)}
    </div>
  );
}

export default FilmList;
