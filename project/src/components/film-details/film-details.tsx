import {Films} from '../../types/films';
import { Link, useParams } from 'react-router-dom';
import NoPage from '../../pages/no-page/no-page';

type FilmDetailsProps = {
  films: Films
}

function FilmDetails({films}: FilmDetailsProps): JSX.Element {
  const params = useParams();
  const film = films.find((element) => element.id === params.id);
  if (film) {
    return (
      <div className="film-card__desc">
        <nav className="film-nav film-card__nav">
          <ul className="film-nav__list">
            <li className="film-nav__item">
              <Link to={`/films/${film.id}`} className="film-nav__link">Overview</Link>
            </li>
            <li className="film-nav__item film-nav__item--active">
              <a href="#" className="film-nav__link">Details</a>
            </li>
            <li className="film-nav__item">
              <Link to={`/films/${film.id}/reviews`} className="film-nav__link">Reviews</Link>
            </li>
          </ul>
        </nav>

        <div className="film-card__text film-card__row">
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Director</strong>
              <span className="film-card__details-value">{film.details.director}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Starring</strong>
              <span className="film-card__details-value">
                {film.details.starring.map((elem) => <span key={elem}>{elem},</span>)}
              </span>
            </p>
          </div>

          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Run Time</strong>
              <span className="film-card__details-value">{film.details.runTime}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">{film.genre}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">{film.year}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <NoPage />;
}

export default FilmDetails;
