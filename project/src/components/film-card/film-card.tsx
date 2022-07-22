
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/films';
import { VideoPlayer } from '../video-player/video-player';


type FilmCardProps = {
  film: Film
}

function FilmCard({film}: FilmCardProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const {id, title} = film;

  return (
    <article
      className="small-film-card catalog__films-card"
    >
      <Link className="small-film-card__link" to={`/films/${id}`}>
        <VideoPlayer film={film} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
        <h3 className="small-film-card__title">
          {title}
        </h3>
      </Link>
    </article>
  );
}

export default FilmCard;
