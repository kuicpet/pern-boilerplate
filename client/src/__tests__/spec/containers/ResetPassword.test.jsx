import React from 'react';
import { shallow } from 'enzyme';

import { mockServer, mockStore } from '../../../__mocks__/mockConfig'
import ConnectResetPassword, { ResetPassword } from '../../../containers/ResetPassword';

let props;
const error = 'Recovery link has expired'

const actionCreators = {
  resetPassword: jest.fn()
}

const resetSpy = jest.spyOn(actionCreators, 'resetPassword');

const setup = (error, loading) => {
  const props = {
    resetPasswordError: error,
    resetPasswordLoading: loading,
    // Action creators
    resetPassword: actionCreators.resetPassword,
    clearResetRequestMessage: actionCreators.clearResetRequestMessage
  };
  return shallow(<ResetPassword {...props} />);
};

describe('ResetPassword component', () => {
  test('renders without crashing', () => {
    const wrapper = setup(error, false);
    expect(wrapper.find('.reset-password-form').length).toBe(1);
  });

  test('displays error when passwords do not match', () => {
    const wrapper = setup(error, true);
    const form = wrapper.find('.reset-password-form');
    const passwordInput = wrapper.find('#reset-password1');
    const confirmInput = wrapper.find('#reset-password2');

    passwordInput.simulate('change', { target: { value: 'mypass' } });
    confirmInput.simulate('change', { target: { value: 'mypassword' } });

    form.simulate('submit', { preventDefault: jest.fn() });

    const errorMessage = wrapper.find('.reset-password-message');
    expect(resetSpy).not.toBeCalled();

    wrapper.unmount();
  });

  test('displays message when request finishes', () => {
    const wrapper = setup(error, false);
    const form = wrapper.find('.reset-password-form');
    const passwordInput = wrapper.find('#reset-password1');
    const confirmInput = wrapper.find('#reset-password2');

    passwordInput.simulate('change', { target: { value: 'mypass' } });
    confirmInput.simulate('change', { target: { value: 'mypass' } });

    form.simulate('submit', { preventDefault: jest.fn() });
    expect(resetSpy).toBeCalled();
  });

  test('disables button when request is processing', () => {
    const wrapper = setup(error, true);
    const btn = wrapper.find('.reset-password-btn');
    expect(btn.text()).toBe('Saving your changes...');
    wrapper.unmount();
  });
});

describe('Connected ResetPassword', () => {
  test('renders without crashing', () => {
    const store = mockStore({
      resetPasswordLoading: false,
      resetPasswordMessage: {
        resetPasswordSuccess: false,
        resetPasswordMesssage: ''
      }
    });
    
    const wrapper = shallow(<ConnectResetPassword store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
