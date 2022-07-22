
import {Films} from '../../types/films';
import FilmCard from '../../components/film-card/film-card';
// import { useState } from 'react';
// import { VideoPlayer } from '../video-player/video-player';

type FilmListProps = {
  films: Films
}

function FilmList({films}: FilmListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.id} film={film}/>)}
    </div>
  );
}

export default FilmList;
