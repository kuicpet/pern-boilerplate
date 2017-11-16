import axios from 'axios';

import { BASE_URL } from '../index';

export const VERIFY_AUTH_SUCCESS = 'VERIFY_AUTH_SUCCESS';
export const VERIFY_AUTH_FAILURE = 'VERIFY_AUTH_FAILURE';
export const VERIFY_AUTH_LOADING = 'VERIFY_AUTH_LOADING';

/**
 * @returns {object} verify_auth_loading action
 */
const verifyAuthLoading = () => ({
  type: VERIFY_AUTH_LOADING
});

/** Action creator for auth success
 * @param {object} response: api response
 * @returns {object} verify_auth_success action
 */
const verifyAuthSuccess = response => ({
  type: VERIFY_AUTH_SUCCESS,
  response
});

/** Action creator for auth failure actions
 * @param {object} response: api error response
 * @returns {object} verify_auth_failure action
 */
const verifyAuthFailure = response => ({
  type: VERIFY_AUTH_FAILURE,
  response
});

/**
 * @param {string} token
 * @returns {function} dispatches action creator
 */
export const verifyAuth = token =>
  (dispatch) => {
    dispatch(verifyAuthLoading());
    const FETCH_URL = `${BASE_URL}/user/me`;
    axios({
      method: 'get',
      url: FETCH_URL,
      headers: {
        'x-auth': token
      }
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(verifyAuthSuccess(response));
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch(verifyAuthFailure(err.response.data.error));
      }
    });
  };
