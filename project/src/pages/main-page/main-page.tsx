import Logo from '../../components/logo/logo';
import {AppRoute, AuthorizationStatus, LoadingObject} from '../../const';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import User from '../../components/user/user';
import { getFilmPromo } from '../../store/film-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import MyListButton from '../../components/my-list-button.tsx/my-list-button';
import FilmsSection from '../../components/films-section/films-section';
import { resetFilmCount } from '../../store/app-process/app-process';
import PageLoader from '../../components/loader/loader';
import { getLoadingObject } from '../../store/app-process/selectors';
import { isAuthStatusUnknown } from '../../film';


function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const filmPromo = useAppSelector(getFilmPromo);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const loadingObject = useAppSelector(getLoadingObject);

  const dispatch = useAppDispatch();

  useEffect(() => () => {
    dispatch(resetFilmCount());
  }, [dispatch]);

  if (isAuthStatusUnknown(authorizationStatus) || loadingObject === LoadingObject.Films) {
    return (
      <PageLoader />
    );
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={`${filmPromo && filmPromo.backgroundImage}`} alt={`${filmPromo && filmPromo.name}`} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo light={false} />
          <User />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={`${filmPromo && filmPromo.posterImage}`} alt={`${filmPromo && filmPromo.posterImage} poster`} width="218" height="327" />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{`${filmPromo && filmPromo.name}`}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{`${filmPromo && filmPromo.genre}`}</span>
                <span className="film-card__year">{`${filmPromo && filmPromo.released}`}</span>
              </p>
              <div className="film-card__buttons">
                <button onClick={() => navigate(`${AppRoute.Player}/${filmPromo && filmPromo.id}`)} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth && <MyListButton film={filmPromo}/>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <FilmsSection />

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

export default MainPage;


