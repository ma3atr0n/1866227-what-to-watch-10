
import {Films} from '../../types/films';
import FilmCard from '../../components/film-card/film-card';
import { useState } from 'react';

type FilmListProps = {
  films: Films
}

function FilmList({films}: FilmListProps): JSX.Element {
  const [, setActiveFilmId] = useState('');
  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.id} film={film} makeActive={setActiveFilmId}/>)}
    </div>
  );
}

export default FilmList;
