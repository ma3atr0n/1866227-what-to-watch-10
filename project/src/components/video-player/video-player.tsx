import { useRef, useEffect } from 'react';
import { Film } from '../../types/films';

type VideoPlayerProps = {
  film: Film,
  isPlaying: boolean,
  setIsPlaying: (isPlaying: boolean) => void;
}

function VideoPlayer({film, isPlaying, setIsPlaying}: VideoPlayerProps): JSX.Element {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  let timerId: NodeJS.Timeout | undefined = undefined;

  useEffect(() => {
    if (playerRef.current === null) {
      return;
    }

    if (isPlaying) {
      playerRef.current.play();
      return;
    }

    playerRef.current.load();

  },[isPlaying]);

  return (
    <video
      onMouseOver={() => {
        timerId = setTimeout(() => setIsPlaying(!isPlaying), 1000);
      }}
      onMouseOut={() => {
        if (isPlaying === false) {
          clearTimeout(timerId);
        }
        setIsPlaying(false);
      }}
      ref={playerRef}
      src={film.previewVideoLink}
      muted
      poster={film.previewImage}
      width='280'
      height='175'
      style={{objectFit: 'cover'}}
    >

    </video>
  );
}

export {VideoPlayer};

