
import { Link } from 'react-router-dom';

type LogoProps = {
  light: boolean
}

function Logo({light}: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link className = {`logo__link${light ? ' logo__link--light' : ''}`} to='/'>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
