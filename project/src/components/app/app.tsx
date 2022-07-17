import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NoPage from '../../pages/no-page/no-page';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../../components/private-route/private-route';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import {Films} from '../../types/films';

type AppPageProps = {
  films: Films
};

function App({films}: AppPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element = {
          <MainPage
            films = {films}
          />
        }
        />
        <Route path={AppRoute.SignIn} element= {<SignInPage />}/>
        <Route path={AppRoute.MyList} element= {
          <PrivateRoute authorizationStatus = {AuthorizationStatus.Auth}>
            <MyListPage films = {films}/>
          </PrivateRoute>
        }
        />

        <Route path={`${AppRoute.Films}/:id`}>
          <Route index element = {<FilmPage films = {films}/>}/>
          <Route path={AppRoute.AddReview} element = {<AddReviewPage films = {films}/>}/>
        </Route>

        <Route path={`${AppRoute.Player}/:id`} element = {<PlayerPage films = {films}/>}/>
        <Route path='add-review-form' element = {<AddReviewForm />}/>
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
