import { Films } from '../../types/films';
import { Genre } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGenre } from '../../store/app-process/selectors';
import { getFilms } from '../../store/film-data/selectors';
import { changeGenre } from '../../store/app-process/app-process';


const getGenreList = (films: Films) => ['All genres',...new Set(films.map((film) => film.genre))];


function GenreList () {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector(getGenre);
  const films = useAppSelector(getFilms);

  return (
    <ul className="catalog__genres-list">
      {getGenreList(films).map((filmGenre) => (
        <li key={filmGenre} className={`catalog__genres-item${activeGenre === filmGenre ? ' catalog__genres-item--active' : ''}`}>
          <a onClick={
            (evt) => {
              evt.preventDefault();
              dispatch(changeGenre(filmGenre));
            }
          }
          href="#"
          className="catalog__genres-link"
          >
            {Genre[filmGenre as keyof typeof Genre]}
          </a>
        </li>
      ))}
    </ul>
  );
}

export {GenreList};
