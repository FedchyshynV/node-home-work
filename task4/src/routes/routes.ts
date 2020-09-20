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
import { getGroups, getGroupById, delateGroup, updateGroup, createGroup, addUsersToGroup } from '../controllers/group';

const validator = createValidator({ passError: false });

const routes = (app: Express) => {
  app.route('/users')
    .get(getUsers);

  app.route('/users',)
    .post(validator.body(userSchema), createUser);

  app.route('/users/:id')
    .get(getUsersById)

    .put(updateUser)

    .delete(delateUser)

  app.route('/groups')
    .get(getGroups)

    .post(createGroup);

  app.route('/groups/:id')
    .get(getGroupById)

    .put(updateGroup)

    .delete(delateGroup)

  app.route('/groups/:groupId/users/:userId')
    .get(addUsersToGroup)
}

export default routes;
