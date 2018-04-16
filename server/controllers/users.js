import * as _ from 'lodash';
import { User } from '../models';

/**
 * @function signin
 * @summary: API controller to handle requests
 * to create new group
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {object} api response: user object for
 * successful requests, or error object for
 * requests that fail
 */
export const signup = (req, res) => {
  const username = req.body.username.trim().toLowerCase();
  const email = req.body.email.trim().toLowerCase();
  User.create({
    username,
    password: req.body.password,
    email,
  })
  .then((user) => {
    const token = user.generateAuthToken();
    return res.header('x-auth', token).status(201).send({
      message: `welcome ${user.username}`,
      user
    });
  })
  .catch(() => res.status(500).send({
    error: 'Internal server error'
  }));
};

/**
 * @function signin
 * @summary: API controller to handle requests
 * to create new group
 * @param {object} req: request object
 * @param {object} res: response object
 * @returns {object} api response
 */
export const signin = (req, res) => {
  const body = _.pick(req.body, ['username', 'password']);
  let username = body.username;
  if (!username || !username.trim()) {
    return res.status(400).send({
      error: 'Username is required.'
    });
  }
  username = body.username.trim().toLowerCase();
  if (!body.password) {
    return res.status(400).send({
      error: 'Password must not be empty'
    });
  }
  User.findOne({
    where: {
      username
    }
  })
  .then((user) => {
    if (!user || !user.validPassword(body.password)) {
      return res.status(401).send({
        error: 'Username/Password is incorrect'
      });
    }
    const token = user.generateAuthToken();
    res.header('x-auth', token).status(200).send({
      message: `welcome back, ${user.username}`,
      user
    });
  });
};

/**
 * @function getMe
 * @description returns the profile of the user making the request
 * @param {Object} req: request object
 * @param {Object} res: response object
 * @returns {Object} success or error response
 */
export const getMe = (req, res) => {
  const currentUser = req.currentUser;
  return res.status(200).send({ currentUser });
};

/**
 * @function getAllUsers
 * @description returns an array of all users
 * @param {Object} req: request object
 * @param {Object} res: response object
 * @returns {Object} success or error response
 */
export const getAllUsers = (req, res) => {
  User.findAll().then((result) => {
    const users = result.map(user => ({
      id: user.id,
      username: user.username,
      about: user.about,
      email: user.email
    }));
    res.status(200).send({ users });
  });
};
