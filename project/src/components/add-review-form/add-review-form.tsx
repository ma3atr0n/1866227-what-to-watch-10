import { useState } from 'react';

const initialState = {
  selectedOption: '8',
  text: ''
};

type Event = {
  target: {
    id: string,
    value: string
  };
}

type RadioStarProps = {
  index: string,
  cb: (evt: Event) => void
}

function AddReviewForm(): JSX.Element {
  const [formData, setFormData] = useState({...initialState});

  const inputChangeHandle = (evt: Event) => {
    const value = evt.target.value;
    setFormData({...formData, selectedOption: value});
  };

  const textareaChangeHandle = (evt: Event) => {
    const value = evt.target.value;
    setFormData({...formData, text: value});
  };

  const RadioStar = ({index, cb}: RadioStarProps) => (
    <>
      <input onChange={cb} className="rating__input" id={`star-${index}`} type="radio" name="rating" value={index} checked={formData.selectedOption === index}/>
      <label className="rating__label" htmlFor={`star-${index}`}>{`Rating ${index}`}</label>
    </>
  );

  return (
    <form action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {Array.from({length: 10}, (elem, index) => index + 1).sort((a,b) => b - a).map((elem) => {
            const indexString = elem.toString();
            return <RadioStar key={indexString} index={indexString} cb={inputChangeHandle}/>;
          })}
        </div>
      </div>

      <div className="add-review__text">
        <textarea onChange={textareaChangeHandle} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}

export default AddReviewForm;
