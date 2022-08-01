import FilmCard from '../../components/film-card/film-card';
import { useAppSelector } from '../../hooks';

type FilmListProps = {
  genre?: string,
  count?: number
}

function FilmList({genre, count = 4}: FilmListProps): JSX.Element {
  let films = useAppSelector((state) => state.filmsByGenre);
  const stateFilms = useAppSelector((state) => state.films);
  const showCount = useAppSelector((state) => state.showCount);
  if (genre) {
    const moreLikeFilms = stateFilms.filter((film) => film.genre === genre).slice(0,count);
    films = moreLikeFilms;
  }
  films = films.slice(0, showCount);
  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.id} film={film}/>)}
    </div>
  );
}

export default FilmList;
