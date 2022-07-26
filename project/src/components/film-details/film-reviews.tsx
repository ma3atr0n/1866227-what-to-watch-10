import { Reviews } from '../../types/reviews';
import FilmReview from '../../components/film-details/film-review';

type FilmReviewsProps = {
  filmReviews: Reviews | undefined
}

function FilmReviews({filmReviews}: FilmReviewsProps): JSX.Element {
  if (filmReviews) {
    return (
      <div className="film-card__reviews film-card__row">
        <div className="film-card__reviews-col">
          {filmReviews.filter((elem, index) => index % 2 === 0).map((elem) => <FilmReview key={elem.id} review={elem}/>)}
        </div>
        <div className="film-card__reviews-col">
          {filmReviews.filter((elem, index) => index % 2 !== 0).map((elem) => <FilmReview key={elem.id} review={elem}/>)}
        </div>
      </div>
    );
  }
  return <p>Нет отзывов</p>;
}

export { FilmReviews };
