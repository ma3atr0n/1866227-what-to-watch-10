
import {Film} from '../../types/films';
import { OneFilmReviews } from '../../types/reviews';
import { useState } from 'react';
import { FilmOverview } from '../film-details/film-owerview';
import { FilmDetails } from '../film-details/film-details';
import { FilmReviews } from '../film-details/film-reviews';
import { FilmTabName } from '../../const';

type FilmOverviewProps = {
  film: Film
  filmReviews: OneFilmReviews | undefined
}

function FilmTabs({film, filmReviews}: FilmOverviewProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(FilmTabName.Overview);

  const renderTabs = (tab: FilmTabName): JSX.Element => {
    switch (tab) {
      case FilmTabName.Overview:
        return <FilmOverview film={film}/>;
      case FilmTabName.Details:
        return <FilmDetails film={film}/>;
      default:
        return <FilmReviews filmReviews={filmReviews}/>;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item${activeTab === FilmTabName.Overview ? ' film-nav__item--active' : ''}`}>
            <a onClick={() => setActiveTab(FilmTabName.Overview)} className="film-nav__link" style={{cursor: 'pointer'}}>Overview</a>
          </li>
          <li className={`film-nav__item${activeTab === FilmTabName.Details ? ' film-nav__item--active' : ''}`}>
            <a onClick={() => setActiveTab(FilmTabName.Details)} className="film-nav__link" style={{cursor: 'pointer'}}>Details</a>
          </li>
          <li className={`film-nav__item${activeTab === FilmTabName.Reviews ? ' film-nav__item--active' : ''}`}>
            <a onClick={() => setActiveTab(FilmTabName.Reviews)} className="film-nav__link" style={{cursor: 'pointer'}}>Reviews</a>
          </li>
        </ul>
      </nav>
      {renderTabs(activeTab)}
    </div>
  );
}

export { FilmTabs };
