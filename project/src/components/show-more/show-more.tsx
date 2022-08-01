import { useAppDispatch } from '../../hooks';
import { showMore } from '../../store/action';

function ShowMore(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className="catalog__more">
      <button onClick={() => dispatch(showMore())} className="catalog__button" type="button">Show more</button>
    </div>
  );
}

export {ShowMore};
