import { useEffect } from 'react';
import FilmList from '../../components/film-list/film-list';
import Logo from '../../components/logo/logo';
import User from '../../components/user/user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmsFavoriteAction } from '../../store/api-action';
import { getFilmsFavorite } from '../../store/film-data/selectors';

function MyListPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const filmsFavorite = useAppSelector(getFilmsFavorite);

  useEffect(() => {
    dispatch(fetchFilmsFavoriteAction());
  }, [dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo light={false} />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{filmsFavorite.length}</span></h1>
        <User />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {filmsFavorite && <FilmList films={filmsFavorite}/>}
      </section>

      <footer className="page-footer">
        <Logo light />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListPage;
