import { reset } from 'redux-form';
import api from '../api';

function setCurrentUser(dispatch, response) {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  dispatch({ type: 'AUTHENTICATION_SUCCESS', response });
}

export function login(data, router) {
  return dispatch => api.post('/session', { user: data })
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('login'));
      router.transitionTo('/');
    });
}

export function register(data) {
  return dispatch => api.post('/users', { user: data })
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('register'));
    });
}

export function logout() {
  return dispatch => api.delete('/session')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    });
}

export function authenticate() {
  return dispatch => api.patch('/session', { credentials: 'include' })
    .then((response) => {
      setCurrentUser(dispatch, response);
    })
    .catch(() => {
      localStorage.removeItem('token');
      window.location = '/login';
    });
}
