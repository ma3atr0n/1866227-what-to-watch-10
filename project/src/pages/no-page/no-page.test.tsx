import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../history-route';
import NoPage from './no-page';

describe('Component: NoPage', () => {
  it('should render currectly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NoPage />
      </HistoryRouter>
    );

    const headerElement = screen.getByText(/404 Not Found/i);
    const linkElement = screen.getByText(/Вернуться на главную/i);

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
