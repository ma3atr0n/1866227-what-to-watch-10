import { Link, useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import NoPage from '../../pages/no-page/no-page';
import { AppRoute, AuthorizationStatus, LoadingObject } from '../../const';
import { useNavigate } from 'react-router-dom';
import { FilmTabs } from '../../components/film-tabs/film-tabs';
import FilmList from '../../components/film-list/film-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmAction, fetchFilmSimilarAction } from '../../store/api-action';
import { useEffect } from 'react';
import User from '../../components/user/user';
import { getFilm, getFilmsSimilar } from '../../store/film-data/selectors';
import { getLoadingObject } from '../../store/app-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import MyListButton from '../../components/my-list-button.tsx/my-list-button';
import PageLoader from '../../components/loader/loader';

function FilmPage(): JSX.Element {
  const {id} = useParams();
  const navigate = useNavigate();
  const film = useAppSelector(getFilm);
  const filmsSimilar = useAppSelector(getFilmsSimilar);
  const loadingObject = useAppSelector(getLoadingObject);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
      dispatch(fetchFilmSimilarAction(id));
    }
  }, [dispatch, id]);

  if (loadingObject === LoadingObject.Film) {
    return (
      <PageLoader />
    );
  }

  if (film.id) {
    return (
      <>
        <section className="film-card film-card--full">
          <div className="film-card__hero">
            <div className="film-card__bg">
              <img src={film.backgroundImage} alt={film.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header film-card__head">
              <Logo light={false} />
              <User />
            </header>

            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{film.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{film.genre}</span>
                  <span className="film-card__year">{film.released}</span>
                </p>

                <div className="film-card__buttons">
                  <button onClick={() => navigate(`${AppRoute.Player}/${film.id}`)} className="btn btn--play film-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <MyListButton film={film}/>
                  {authorizationStatus === AuthorizationStatus.Auth && <Link to = 'review' className="btn film-card__button">Add review</Link>}
                </div>
              </div>
            </div>
          </div>

          <div className="film-card__wrap film-card__translate-top">
            <div className="film-card__info">
              <div className="film-card__poster film-card__poster--big">
                <img src={film.posterImage} alt={film.name} width="218" height="327" />
              </div>

              <FilmTabs />
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <FilmList films={filmsSimilar} count={4}/>
          </section>

          <footer className="page-footer">
            <Logo light />

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  }

  return (<NoPage />);
}

export default FilmPage;
