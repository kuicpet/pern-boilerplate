import * as usersController from '../controllers/users';
import authenticate from '../middleware/authenticate';
import isValidUsername from '../middleware/isValidUsername';
import isValidEmail from '../middleware/isValidEmail';
import isTaken from '../middleware/isTaken';

module.exports = (app) => {
  app.get('/api/', (req, res) => res.status(200).send({
    message: 'Welcome to our API!',
  }));

  // User routes
  app.post('/api/v1/user/signup', isValidUsername,
  isValidEmail, isTaken, usersController.signup);

  app.post('/api/v1/user/signin',
    usersController.signin);

  app.get('/api/v1/user/me', authenticate, usersController.getMe);

  app.get('/api/v1/user/all', authenticate, usersController.getAllUsers);
};
