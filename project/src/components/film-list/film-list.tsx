
import {Films} from '../../types/films';
import FilmCard from '../../components/film-card/film-card';
// import { useState } from 'react';
// import { VideoPlayer } from '../video-player/video-player';

type FilmListProps = {
  films: Films
  ganre?: string,
  count?: number
}

function FilmList({films, ganre, count = 4}: FilmListProps): JSX.Element {
  if (ganre) {
    const filmsByganre = films.filter((film) => film.genre === ganre).slice(0,count);
    films = filmsByganre;
  }

  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.id} film={film}/>)}
    </div>
  );
}

export default FilmList;
