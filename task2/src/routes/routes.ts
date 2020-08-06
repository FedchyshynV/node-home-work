import {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  delateUser,
} from '../controllers/user';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator
} from 'express-joi-validation'
import { Express } from 'express-serve-static-core';
import { userSchema } from '../validators/user.validators';

const validator = createValidator({passError: false});

const routes = (app: Express) => {
  app.route('/users')
    .get(getUsers);

  app.route('/user',)
    .post(validator.body(userSchema), createUser);

  app.route('/user/:id')
    .get(getUsersById)

    .put(updateUser)

    .delete(delateUser)
}

export default routes;
