import FilmCard from '../../components/film-card/film-card';
import { useAppSelector } from '../../hooks';
import { getShowCount } from '../../store/app-process/selectors';
import { Films } from '../../types/films';

type FilmListProps = {
  films: Films,
  count?: number
}

function FilmList({films, count}: FilmListProps): JSX.Element {
  const showCount = useAppSelector(getShowCount);
  if (count) {
    const moreLikeFilms = films.slice(0,count);
    films = moreLikeFilms;
  }
  films = films.slice(0, Math.max(showCount, count ?? 0));
  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.id} film={film}/>)}
    </div>
  );
}

export default FilmList;
