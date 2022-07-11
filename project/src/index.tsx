import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

<<<<<<< HEAD
const filmCard = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014
};

=======
>>>>>>> master
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <App
      filmCard = {filmCard}
    />
=======
    <App />
>>>>>>> master
  </React.StrictMode>,
);
