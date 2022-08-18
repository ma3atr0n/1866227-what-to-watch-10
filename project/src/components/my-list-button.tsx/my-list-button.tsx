import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmsFavoriteAction, postFilmFavoriteStatusAction } from '../../store/api-action';
import { getFilmsFavorite } from '../../store/film-data/selectors';
import { Film } from '../../types/films';

type MyListButtonProps = {
  film: Film
}

function MyListButton({film}: MyListButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const filmsFavorite = useAppSelector(getFilmsFavorite);
  const favoriteFilm = filmsFavorite.find((item) => item.id === film.id);

  useEffect(() => {
    dispatch(fetchFilmsFavoriteAction());
  },[dispatch]);

  const getFavoriteStatus = (): 1 | 0 => {
    if (favoriteFilm && favoriteFilm.isFavorite) {
      return 0;
    }
    return 1;
  };

  return (
    <button onClick={() => {
      dispatch(postFilmFavoriteStatusAction({
        filmId: film.id,
        status: getFavoriteStatus(),
      }));

    }}className="btn btn--list film-card__button" type="button"
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={`${getFavoriteStatus()}` === '0' ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{filmsFavorite.length}</span>
    </button>
  );

}

export default MyListButton;


