import NoPage from '../../pages/no-page/no-page';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/film-data/selectors';
import { useEffect, useRef, useState } from 'react';
import PageLoader from '../../components/loader/loader';
import { getFilmTime } from '../../utils/common';


function PlayerPage(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const films = useAppSelector(getFilms);
  const film = films.find((element) => element.id.toString() === params.id);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [togglerPos, setTogglerPos] = useState(0);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    const updateTogglerPos = () => {
      if (videoRef.current !== null) {
        setTogglerPos(videoRef.current.currentTime / videoRef.current.duration * 100);
      }
      if (videoRef.current?.ended) {
        setIsPlaying(false);
      }
    };

    const addIsLoading = () => setIsLoading(true);
    const dellIsLoading = () => setIsLoading(false);

    videoRef.current.addEventListener('timeupdate', updateTogglerPos);
    videoRef.current.addEventListener('loadstart', addIsLoading);
    videoRef.current.addEventListener('canplay', dellIsLoading);

    if (isPlaying) {
      videoRef.current.play();
      videoRef.current.muted = false;
      return;
    }

    videoRef.current.pause();

    return () => {
      videoRef.current?.removeEventListener('timeupdate', updateTogglerPos);
      videoRef.current?.removeEventListener('loadstart', addIsLoading);
      videoRef.current?.removeEventListener('canplay', dellIsLoading);
    };
  },[isPlaying, film]);


  if (film) {
    return (
      <div className="player">
        {isLoading && <PageLoader />}
        <video ref={videoRef} src={film.videoLink} className="player__video" poster={film.posterImage} muted></video>
        <button onClick={() => navigate(-1)} type="button" className="player__exit">Exit</button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={togglerPos} max="100"></progress>
              <div className="player__toggler" style= {{left: `${togglerPos}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{`${getFilmTime(videoRef.current?.duration)}`}</div>
          </div>
          <div className="player__controls-row">
            <button onClick={() => setIsPlaying(!isPlaying)} type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
              </svg>
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <div className="player__name">Transpotting</div>
            <button onClick={() => videoRef.current?.requestFullscreen()}type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <NoPage />;
}

export default PlayerPage;

