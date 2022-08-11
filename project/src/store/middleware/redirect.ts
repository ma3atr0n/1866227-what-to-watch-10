import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { reducer } from '../reducer';

type Reducer = ReturnType<typeof reducer>;

const redirect: Middleware<unknown, Reducer> = (store) => (next) => (action) => {
  if (action.type === 'browser/redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};

export default redirect;

