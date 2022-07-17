
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import {Film} from '../../types/films';

type FilmCardProps = {
  film: Film,
  makeActive: Dispatch<SetStateAction<string>>
}

function FilmCard({film, makeActive}: FilmCardProps): JSX.Element {
  const {id, title, previewUrl} = film;
  return (
    <article onMouseOver={() => makeActive(id)} className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={previewUrl} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
