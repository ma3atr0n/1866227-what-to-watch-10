import loaderImg from '../../assets/img/loader.gif';
import '../loader/loader.css';

function PageLoader(): JSX.Element {
  return (
    <div className="loader-container">
      <div className="loader">
        <img src={loaderImg}></img>
      </div>
    </div>
  );
}

export default PageLoader;
