import Logo from '../../components/logo/logo';
import { Link, useParams } from 'react-router-dom';
import NoPage from '../../pages/no-page/no-page';
import {AppRoute, LoadingObject} from '../../const';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilm } from '../../store/film-data/selectors';
import { useEffect } from 'react';
import { fetchFilmAction } from '../../store/api-action';
import PageLoader from '../../components/loader/loader';
import { getLoadingObject } from '../../store/app-process/selectors';
import User from '../../components/user/user';


function AddReviewPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const loadingObject = useAppSelector(getLoadingObject);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
    }
  }, [dispatch, id]);

  if (loadingObject === LoadingObject.Film) {
    return (
      <PageLoader />
    );
  }

  if (film) {
    return (
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo light={false} />

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`${AppRoute.Films}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <User />
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <AddReviewForm />
        </div>

      </section>
    );
  }
  return <NoPage />;

}

export default AddReviewPage;
