import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { filmReviews } from './mocks/reviews';
import { store } from './hooks';
import { checkAuthAction, fetchFilmsAction } from './store/api-action';
import ErrorMessage from './components/error/error';
import { setFilmsByGenre } from './store/action';


store.dispatch(fetchFilmsAction());
store.dispatch(setFilmsByGenre());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        filmReviews = {filmReviews}
      />
    </Provider>
  </React.StrictMode>,
);
