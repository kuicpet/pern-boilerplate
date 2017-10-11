import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

import { mock, middlewares, mockStore } from '../../../../__mocks__/mockConfig';

import {
  uploadImage,
  editProfile
} from '../../../../actions/index.js';

import {
  EDIT_PROFILE_LOADING,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE
} from '../../../../constants';

describe('clearFormError action creator', () => {
  test('dispatches an action', () => {
    // mocks the post request
    mock.onPost().replyOnce(201, {
      data: {
        message: 'Group successfully updated'
      }
    });
    const upload = uploadImage({});
    expect(typeof upload).toBe('object');
  });
});

describe('editProfile action creator', () => {
  test('dispatches a success action when dispatched with valid details', () => {
    const store = mockStore({ user: {} });
    const data = {
      user: {
        id: 2,
        username: 'ray',
        about: 'New to Postit',
        email: 'ray@example.com'
      }
    }

    // mocks the post request
    mock.onPatch().replyOnce(201, {
      data
    });

    const expectedAction = {
      type: EDIT_PROFILE_SUCCESS,
      response: { data }
    }

    store.dispatch(editProfile('validtoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe('EDIT_PROFILE_LOADING');
        expect(actions[1].type).toBe('EDIT_PROFILE_SUCCESS');
        expect(actions[1].response.data).toEqual(expectedAction.response);
      });
  })

  test('dispatches a failure action when dispatched with invalid details', () => {
    const store = mockStore({ user: {} });
    const data = {
      error: 'Email is required'
    }

    // mock the post request
    mock.onPatch().replyOnce(400, data);

    const expectedAction = {
      type: EDIT_PROFILE_FAILURE,
      error: data.error
    };

    store.dispatch(editProfile('I like movies', null, 'my image url', 'sometoken')).then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(EDIT_PROFILE_LOADING);
        expect(actions[1].type).toBe(EDIT_PROFILE_FAILURE);
      });
  })
});