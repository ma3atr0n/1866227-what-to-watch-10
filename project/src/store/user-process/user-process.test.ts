import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { UserData } from '../../types/user-data';
import { makeFakeUserData } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';
import { userProcess } from './user-process';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {} as UserData,
};

const fakeUserData = makeFakeUserData();

describe('Reducer: user',() => {
  let state: UserProcess;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });
  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type, payload: fakeUserData}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userData: fakeUserData});
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: {} as UserData});
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: loginAction.fulfilled.type, payload: fakeUserData}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userData: fakeUserData});
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: {} as UserData});
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: {} as UserData});
    });
  });
});
