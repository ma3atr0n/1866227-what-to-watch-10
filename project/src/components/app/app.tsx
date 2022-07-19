import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import FilmPage from '../../pages/film-page/film-page';
import FilmOverview from '../../components/film-details/film-owerview';
import FilmDetails from '../../components/film-details/film-details';
import FilmReviews from '../../components/film-details/film-reviews';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NoPage from '../../pages/no-page/no-page';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../../components/private-route/private-route';
import {Films} from '../../types/films';
import { FilmsReviews } from '../../types/reviews';


type AppPageProps = {
  films: Films
  filmsReviews: FilmsReviews
};

function App({films, filmsReviews}: AppPageProps): JSX.Element {
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
          <PrivateRoute authorizationStatus = {AuthorizationStatus.NoAuth}>
            <MyListPage films = {films}/>
          </PrivateRoute>
        }
        />

        <Route path={`${AppRoute.Films}/:id`} element = {<FilmPage films = {films}/>}>
          <Route index element = {<FilmOverview films = {films}/>}/>
          <Route path='details' element = {<FilmDetails films = {films}/>}/>
          <Route path='reviews' element = {<FilmReviews filmsReviews = {filmsReviews}/>}/>
        </Route>
        <Route path={`${AppRoute.Films}/:id/${AppRoute.AddReview}`} element = {<AddReviewPage films = {films}/>}/>

        <Route path={`${AppRoute.Player}/:id`} element = {<PlayerPage films = {films}/>}/>
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
