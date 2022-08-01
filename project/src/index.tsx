import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { filmReviews } from './mocks/reviews';
import { store } from './hooks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        filmReviews = {filmReviews}
      />
    </Provider>
  </React.StrictMode>,
);
