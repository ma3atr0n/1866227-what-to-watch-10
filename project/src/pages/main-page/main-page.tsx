import FilmList from '../../components/film-list/film-list';
import Logo from '../../components/logo/logo';
import {Films} from '../../types/films';
import {AppRoute} from '../../const';
import { useNavigate } from 'react-router-dom';
import { GenreList } from '../../components/genre-list/genre-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ShowMore } from '../../components/show-more/show-more';
import { useEffect } from 'react';
import { resetFilmCount } from '../../store/action';


type MainPageProps = {
    films: Films
  };

function MainPage({films}: MainPageProps): JSX.Element {
  const navigate = useNavigate();
  const showCount = useAppSelector((state) => state.showCount);
  const stateFilms = useAppSelector((state) => state.films);

  const dispatch = useAppDispatch();

  useEffect(() => () => {
    dispatch(resetFilmCount());
  }, []);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo light={false} />
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">The Grand Budapest Hotel</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">Drama</span>
                <span className="film-card__year">2014</span>
              </p>
              <div className="film-card__buttons">
                <button onClick={() => navigate(`${AppRoute.Player}/1`)} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>

                <button onClick={() => navigate(AppRoute.MyList)} className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList films={films}/>

          <FilmList films={stateFilms.slice(0, showCount)}/>

          {showCount < stateFilms.length && <ShowMore />}
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

export default MainPage;
