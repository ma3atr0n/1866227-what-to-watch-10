import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import FilmsPage from '../../pages/films-page/films-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NoPage from '../../pages/no-page/no-page';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../../components/private-route/private-route';

type AppPageProps = {
  filmCard: {
    title: string,
    genre: string,
    year: number
  }
};

function App({filmCard}: AppPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element = {
          <MainPage
            filmCard = {filmCard}
          />
        }
        />
        <Route path={AppRoute.SignIn} element= {<SignInPage />}/>
        <Route path={AppRoute.MyList} element= {
          <PrivateRoute authorizationStatus = {AuthorizationStatus.NoAuth}>
            <MyListPage />
          </PrivateRoute>
        }
        />

        <Route path={AppRoute.Films}>
          <Route path=':id'>
            <Route index element = {<FilmsPage films={[]}/>}/>
            <Route path={AppRoute.AddReview} element = {<AddReviewPage />}/>
          </Route>
        </Route>

        <Route path={AppRoute.Player}>
          <Route path=':id' element = {<PlayerPage films={[]}/>}/>
        </Route>
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
