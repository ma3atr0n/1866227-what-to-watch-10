import {Films} from '../../types/films';
import { Link, useParams } from 'react-router-dom';
import NoPage from '../../pages/no-page/no-page';

type FilmOverviewProps = {
  films: Films
}

function FilmOverview({films}: FilmOverviewProps): JSX.Element {
  const params = useParams();
  const film = films.find((element) => element.id === params.id);
  if (film) {
    return (
      <div className="film-card__desc">
        <nav className="film-nav film-card__nav">
          <ul className="film-nav__list">
            <li className="film-nav__item film-nav__item--active">
              <a href="#" className="film-nav__link">Overview</a>
            </li>
            <li className="film-nav__item">
              <Link to='details' className="film-nav__link">Details</Link>
            </li>
            <li className="film-nav__item">
              <Link to='reviews' className="film-nav__link">Reviews</Link>
            </li>
          </ul>
        </nav>

        <div className="film-rating">
          <div className="film-rating__score">{film.details.rate.score}</div>
          <p className="film-rating__meta">
            <span className="film-rating__level">{film.details.rate.level}</span>
            <span className="film-rating__count">{`${film.details.rate.count} ratings`}</span>
          </p>
        </div>

        <div className="film-card__text">
          <p>{film.details.description}</p>

          <p className="film-card__director"><strong>{`Director: ${film.details.director}`}</strong></p>

          <p className="film-card__starring"><strong>{`Starring: ${film.details.starring}`}</strong></p>
        </div>
      </div>
    );
  }

  return <NoPage />;
}

export default FilmOverview;
