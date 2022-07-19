import { Review } from '../../types/reviews';

type FilmReviewProps = {
  review: Review
}

function FilmReview({review}: FilmReviewProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.text}</p>

        <footer className="review__details">
          <cite className="review__author">{review.author}</cite>
          <time className="review__date" dateTime={review.date.toISOString().split('T')[0]}>{review.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.reviewRate.toFixed(1)}</div>
    </div>
  );
}

export default FilmReview;
