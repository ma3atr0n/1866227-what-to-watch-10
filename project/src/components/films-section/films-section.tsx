import React from 'react';
import { useAppSelector } from '../../hooks';
import { getShowCount } from '../../store/app-process/selectors';
import { filterFilmByGenre } from '../../store/film-data/selectors';
import FilmList from '../film-list/film-list';
import { GenreList } from '../genre-list/genre-list';
import ShowMore from '../show-more/show-more';

function FilmsSection(): JSX.Element {

  const showCount = useAppSelector(getShowCount);
  const filmsByGenre = useAppSelector(filterFilmByGenre);


  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenreList />

      <FilmList films={filmsByGenre}/>

      {showCount < filmsByGenre.length && <ShowMore />}
    </section>
  );
}

export default React.memo(FilmsSection);
