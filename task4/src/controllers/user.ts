import * as express from 'express';
import { IUser } from "../interfaces/user.interface";
import { MESSAGE_TYPE } from "../enums/status-code.enum";
import HttpException from '../exceptions/http-exception';
import UserService from '../services/user.service';

const userServiceInstance = new UserService();


export const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  try {
    const createdUserResult = await userServiceInstance.createUser(req.body);
    res.send(createdUserResult);
  } catch (e) {
    next(new HttpException(MESSAGE_TYPE.INTERNAL_SERVER_ERROR, `Some error occurred while creating the user.`));
  }
};

export const updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;

  const updatedUserResult = await userServiceInstance.updateUser(req.body, id);

  if (updatedUserResult[0] === 1) {
    res.send(updatedUserResult[1][0]);
  } else {
    next(new HttpException(MESSAGE_TYPE.NOT_FOUND, `Cannot update user with id ${id}. Maybe user was not found or req.body is empty!`));
  }
};

export const delateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => { // soft delete
  const { id } = req.params;
  const updatedUserResult = await userServiceInstance.deleteUser(req.body, id);

  if (updatedUserResult === 1) {
    res.send({
      message: `User with id ${id} was deleted successfully!`
    });
  } else {
    next(new HttpException(MESSAGE_TYPE.NOT_FOUND, `Cannot delete user with id ${id}. Maybe user was not found!`));
  }
};

export const getUsersById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;

  const user: IUser = await userServiceInstance.getUsersById(id);

  if (user) {
    res.send(user);
  } else {
    next(new HttpException(MESSAGE_TYPE.NOT_FOUND, `Cannot find user with id ${id}. Maybe user was not found!`));
  }
};

export const getUsers = async (req: express.Request, res: express.Response) => {
  let { limit, search = '' } = req.query;
  const users: IUser[] = await userServiceInstance.getUsers(limit, search);

  res.send(users);
};
