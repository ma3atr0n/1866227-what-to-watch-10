import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmsFavoriteAction, postFilmFavoriteStatusAction } from '../../store/api-action';
import { getFilmsFavorite } from '../../store/film-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Film } from '../../types/films';

type MyListButtonProps = {
  film: Film
}

function MyListButton({film}: MyListButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filmsFavorite = useAppSelector(getFilmsFavorite);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteFilm = filmsFavorite.find((item) => item.id === film.id);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFilmsFavoriteAction());
    }
  },[dispatch]);

  const getFavoriteStatus = (): 1 | 0 => {
    if (favoriteFilm && favoriteFilm.isFavorite) {
      return 0;
    }
    return 1;
  };

  const onButtonClickHandle = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.SignIn);
    }
    dispatch(postFilmFavoriteStatusAction({
      filmId: film.id,
      status: getFavoriteStatus(),
    }));
  };

  return (
    <button onClick={onButtonClickHandle}className="btn btn--list film-card__button" type="button">
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={`${getFavoriteStatus()}` === '0' ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{filmsFavorite.length}</span>
    </button>
  );

}

export default MyListButton;


