import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../history-route';
import { makeFakeReview } from '../../utils/mocks';
import { Review } from '../../types/reviews';
import FilmReview from './film-review';

const fakeReview:Review = makeFakeReview();

describe('Component: FilmDetails', () => {
  it('should render currectly', () => {
    const history = createMemoryHistory();
    history.push('/films/1');

    render(
      <HistoryRouter history={history}>
        <FilmReview review={fakeReview}/>
      </HistoryRouter>
    );

    expect(screen.getByText(`${fakeReview.user.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeReview.comment}`)).toBeInTheDocument();
  });
});
