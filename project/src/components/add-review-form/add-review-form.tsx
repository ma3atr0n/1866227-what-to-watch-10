import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReviewFormSettings } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviewsAction } from '../../store/api-action';
import { getIsFormBlocked } from '../../store/review-data/selectors';
import { FormData } from '../../types/form-data';

type Event = {
  target: {
    id: string,
    value: string
  };
}

type RadioStarProps = {
  index: number,
  cb: (evt: Event) => void
}

const initialState: FormData = {
  filmId: '',
  rating: 8,
  comment: ''
};

function AddReviewForm(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({...initialState, filmId: id});
  const isFormBlocked = useAppSelector(getIsFormBlocked);

  const inputChangeHandle = (evt: Event) => {
    const value = parseInt(evt.target.value, 10);
    setFormData({...formData, rating: value});
  };

  const textareaChangeHandle = (evt: Event) => {
    const value = evt.target.value;
    setFormData({...formData, comment: value});
  };

  const onSumbitHandle = (evt: React.SyntheticEvent): void => {
    evt.preventDefault();
    dispatch(postReviewsAction(formData));
  };

  const RadioStar = ({index, cb}: RadioStarProps) => (
    <>
      <input onChange={cb} className="rating__input" id={`star-${index}`} type="radio" name="rating" value={index} checked={formData.rating === index} disabled={isFormBlocked}/>
      <label className="rating__label" htmlFor={`star-${index}`}>{`Rating ${index}`}</label>
    </>
  );

  return (
    <form action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {Array.from({length: 10}, (elem, index) => index + 1).sort((a,b) => b - a).map((elem) => {
            const index = elem;
            return <RadioStar key={index} index={index} cb={inputChangeHandle}/>;
          })}
        </div>
      </div>

      <div className="add-review__text">
        <textarea onChange={textareaChangeHandle} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={formData.comment} disabled={isFormBlocked} data-testid='comment'></textarea>
        <div className="add-review__submit">
          <button onClick={onSumbitHandle} className="add-review__btn" type="submit" disabled={!(formData.comment.length >= ReviewFormSettings.MinCommentLength && formData.comment.length <= ReviewFormSettings.MaxCommentLength) || isFormBlocked}>Post</button>
        </div>

      </div>
    </form>
  );
}

export default AddReviewForm;
