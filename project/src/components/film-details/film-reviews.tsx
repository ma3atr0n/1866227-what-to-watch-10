import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilmReview from '../../components/film-details/film-review';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-action';

function FilmReviews(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewsAction(id));
    }
  },[dispatch, id]);

  const filmReviews = useAppSelector((state) => state.reviews);
  if (filmReviews.length > 0) {
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
