import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../history-route';
import AddReviewForm from './add-review-form';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const initialState = {
  REVIEW_DATA: {
    reviews: [],
    isFormBlocked: false,
  },
};

const mockStore = configureMockStore();
const store = mockStore(initialState);

describe('Component: AddReviewForm', () => {
  it('should render "AddReviewForm" when user navigate to \'/films/2/review\'', async () => {
    const history = createMemoryHistory();
    history.push('/films/2/review');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Post/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Rating 10/i)).toBeInTheDocument();

    expect(screen.getByLabelText('Rating 1')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('comment'), 'Nice film!!!');

    expect(screen.getByDisplayValue(/Nice film!!!/i)).toBeInTheDocument();
  });
});
