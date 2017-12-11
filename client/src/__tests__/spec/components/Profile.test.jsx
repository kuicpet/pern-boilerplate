import React from 'react';
import { shallow, mount } from 'enzyme';
import { mock, mockStore } from '../../../__mocks__/mockConfig';
import Profile from '../../../components/Profile';

const user = {
  id: 2,
  username: 'sammy',
  email: 'sammy@test.com',
  about: 'New to Postit',
  imageUrl: ''
};

const state = {
  imageUrl: '/pics/profile.png'
}

const funcs = {
  edit: jest.fn()
}

const editSpy = jest.spyOn(funcs, 'edit');

describe('Profile component', () => {
  test('should mount without crashing', () => { 
    const wrapper = () => mount(<Profile
      user={user} edit={funcs.edit} state={state} />);
    expect(wrapper().find('.edit-profile-card').length).toBe(1);
    expect(wrapper().find('.edit-profile-card .profile-header').text()).toBe('My Profile');
    expect(wrapper().find('.join-info h5').text()).toBe(user.username);
  });
});
