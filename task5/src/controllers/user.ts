import * as express from 'express';
import { IUser } from "../interfaces/user.interface";
import { MESSAGE_TYPE } from "../enums/status-code.enum";
import HttpException from '../exceptions/http-exception';
import UserService from '../services/user.service';
import { logger } from '../logger/logger';

const userServiceInstance = new UserService();


export const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  try {
    logger.info(`service: UserService, method: createUser, params: ${req.body}`)
    const createdUserResult = await userServiceInstance.createUser(req.body);
    res.send(createdUserResult);
  } catch (e) {
    logger.error(`service: UserService, method: createUser, params: ${req.body}, message: Some error occurred while creating the user`);
    next(new HttpException(MESSAGE_TYPE.INTERNAL_SERVER_ERROR, `Some error occurred while creating the user.`));
  }
};

export const updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  logger.info(`service: UserService, method: updateUser, params: ${req.body}, id: ${id}`)
  const updatedUserResult = await userServiceInstance.updateUser(req.body, id);

  if (updatedUserResult[0] === 1) {
    res.send(updatedUserResult[1][0]);
  } else {
    logger.error(`service: UserService, method: updateUser, params: ${req.body}, id: ${id}, message: Cannot update user with id ${id}. Maybe user was not found or req.body is empty!`);
    next(new HttpException(MESSAGE_TYPE.NOT_FOUND, `Cannot update user with id ${id}. Maybe user was not found or req.body is empty!`));
  }
};

export const delateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => { // soft delete
  const { id } = req.params;
  logger.info(`service: UserService, method: deleteUser, params: ${req.body}, id: ${id}`)
  const updatedUserResult = await userServiceInstance.deleteUser(req.body, id);

  if (updatedUserResult === 1) {
    res.send({
      message: `User with id ${id} was deleted successfully!`
    });
  } else {
    logger.error(`service: UserService, method: deleteUser, message: Cannot delete user with id ${id}. Maybe user was not found!`);
    next(new HttpException(MESSAGE_TYPE.NOT_FOUND, `Cannot delete user with id ${id}. Maybe user was not found!`));
  }
};

export const getUsersById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  logger.info(`service: UserService, method: getUsersById, params: id: ${id}`)
  const user: IUser = await userServiceInstance.getUsersById(id);

  if (user) {
    res.send(user);
  } else {
    logger.error(`service: UserService, method: getUsersById, message: Cannot find user with id ${id}. Maybe user was not found!`);
    next(new HttpException(MESSAGE_TYPE.NOT_FOUND, `Cannot find user with id ${id}. Maybe user was not found!`));
  }
};

export const getUsers = async (req: express.Request, res: express.Response) => {
  let { limit, search = '' } = req.query;

  try {
    logger.info(`service: UserService, method: getUsers, params: { limit: ${limit}, search: ${search}}`)
    const users: IUser[] = await userServiceInstance.getUsers(limit, search);
    res.send(users);
  } catch (e) {
    logger.error(`service: UserService, method: getUsers, params: { limit: ${limit}, search: ${search}}, message: Some error occurred while getting the users.`);
  }
};
