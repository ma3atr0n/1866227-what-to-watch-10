import { Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NoPage from '../../pages/no-page/no-page';
import { AppRoute } from '../../const';
import PrivateRoute from '../../components/private-route/private-route';
import { Reviews } from '../../types/reviews';
import { useAppSelector } from '../../hooks';
import { Loading } from '../loading/loading';
import { isCheckedAuth } from '../../film';
import HistoryRouter from '../../history-route';
import browserHistory from '../../browser-history';

type AppPageProps = {
  filmReviews: Reviews
};

function App({filmReviews}: AppPageProps): JSX.Element {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element = {
          <MainPage />
        }
        />
        <Route path={AppRoute.SignIn} element= {<SignInPage />}/>
        <Route path={AppRoute.MyList} element= {
          <PrivateRoute >
            <MyListPage />
          </PrivateRoute>
        }
        />
        <Route path={`${AppRoute.Films}/:id`} element = {<FilmPage filmReviews={filmReviews}/>}/>
        <Route path={`${AppRoute.Films}/:id/${AppRoute.AddReview}`} element = {<AddReviewPage />}/>

        <Route path={`${AppRoute.Player}/:id`} element = {<PlayerPage />}/>
        <Route path='*' element={<NoPage />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;


