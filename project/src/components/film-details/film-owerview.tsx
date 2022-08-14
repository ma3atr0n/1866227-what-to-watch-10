import { useAppSelector } from '../../hooks';

type RatingNameType = {
  [key: string]: number[]
}

const RatingName: RatingNameType = {
  'Bad': [0, 3],
  'Normal': [3, 5],
  'Good': [5, 8],
  'Very good': [8, 10],
  'Awesome': [10, Infinity],
};

const getRatingName = (rate: number) => {
  const res = Object.entries(RatingName)
    .filter(([,value]) => value[0] <= rate && value[1] > rate).flat();
  return res[0] ? res[0] : 'Unknown';
};


function FilmOverview(): JSX.Element {
  const film = useAppSelector((state) => state.film);
  if (film) {
    return (
      <>
        <div className="film-rating">
          <div className="film-rating__score">{film.rating.toFixed(1)}</div>
          <p className="film-rating__meta">
            <span className="film-rating__level">{getRatingName(film.rating)}</span>
            <span className="film-rating__count">{`${film.scoresCount.toLocaleString('ru',{ style: 'decimal'})} ratings`}</span>
          </p>
        </div>

        <div className="film-card__text">
          <p>{film.description}</p>

          <p className="film-card__director"><strong>{`Director: ${film.director}`}</strong></p>

          <p className="film-card__starring"><strong>{`Starring: ${film.starring}`}</strong></p>
        </div>
      </>
    );
  }

  return <p>Нет данных</p>;
}

export {FilmOverview};
