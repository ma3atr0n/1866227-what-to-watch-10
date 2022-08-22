import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-action';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/selectors';

function User(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);

  const logoutHandle = (evt: React.SyntheticEvent): void => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar" onClick={() => navigate(AppRoute.MyList)}>
            <img src={userData.avatarUrl} alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <a className="user-block__link" onClick={logoutHandle}>Sign out</a>
        </li>
      </ul>
    );
  }

  return (
    <div className="user-block">
      <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
    </div>
  );
}

export default React.memo(User);

