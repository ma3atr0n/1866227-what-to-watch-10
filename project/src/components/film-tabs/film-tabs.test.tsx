import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../history-route';
import { FilmTabs } from './film-tabs';
import { makeFakeFilm } from '../../utils/mocks';
import { FilmData } from '../../types/state';
import { Film } from '../../types/films';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const fakeFilm = makeFakeFilm();

const initialState = {
  FILM_DATA: {
    films: [],
    film: fakeFilm as Film,
    filmsSimilar: [],
    filmsFavorite: [],
    filmPromo: {} as Film,
  } as FilmData
};

const mockStore = configureMockStore();
const store = mockStore(initialState);

describe('Component: FilmTabs', () => {
  it('should render currectly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmTabs />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Director:/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring:/i)).toBeInTheDocument();
    expect(screen.getByText(/ratings/i)).toBeInTheDocument();
  });
});
