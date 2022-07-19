import {FilmsReviews} from '../../types/reviews';
import { Link, useParams } from 'react-router-dom';
import NoPage from '../../pages/no-page/no-page';
import FilmReview from '../../components/film-details/film-review';

type FilmReviewsProps = {
  filmsReviews: FilmsReviews
}

function FilmReviews({filmsReviews}: FilmReviewsProps): JSX.Element {
  const params = useParams();
  const reviews = filmsReviews.find((element) => element.filmId === params.id);
  if (reviews) {
    return (
      <div className="film-card__desc">
        <nav className="film-nav film-card__nav">
          <ul className="film-nav__list">
            <li className="film-nav__item">
              <Link to={`/films/${reviews.filmId}`} className="film-nav__link">Overview</Link>
            </li>
            <li className="film-nav__item">
              <Link to={`/films/${reviews.filmId}/details`} className="film-nav__link">Details</Link>
            </li>
            <li className="film-nav__item film-nav__item--active">
              <a href="#" className="film-nav__link">Reviews</a>
            </li>
          </ul>
        </nav>

        <div className="film-card__reviews film-card__row">
          <div className="film-card__reviews-col">
            {reviews.reviews.slice(0,3).map((elem) => <FilmReview key={elem.reviewId} review={elem}/>)}
          </div>
          <div className="film-card__reviews-col">
            {reviews.reviews.slice(3,6).map((elem) => <FilmReview key={elem.reviewId} review={elem}/>)}
          </div>
        </div>
      </div>
    );
  }

  return <NoPage />;
}

export default FilmReviews;
