import * as express from 'express';
import { IUser } from "../interfaces/user.interface";
import { MESSAGE_TYPE } from "../enums/status-code.enum";
import HttpException from '../exceptions/http-exception';
import GroupService from '../services/group.service';
import { IGroup } from '../interfaces/group.interface';
import { logger } from '../logger/logger';

const groupServiceInstance = new GroupService();

export const createGroup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  try {
    logger.info(`service: GroupService, method: createGroup, params: ${req.body}`)
    const createdGroupResult = await groupServiceInstance.createGroup(req.body);
    res.send(createdGroupResult);
  } catch (e) {
    logger.error(`service: GroupService, method: createGroup, params: ${req.body}, message: Some error occurred while creating the group`);
    next(new HttpException(MESSAGE_TYPE.INTERNAL_SERVER_ERROR, `Some error occurred while creating the group.`));
  }
};

export const updateGroup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  logger.info(`service: GroupService, method: updateGroup, params: ${req.body}, id: ${id}`)
  const updatedUserResult = await groupServiceInstance.updateGroup(req.body, id);

  if (updatedUserResult[0] === 1) {
    res.send(updatedUserResult[1][0]);
  } else {
    logger.error(`service: GroupService, method: updateGroup, params: ${req.body}, id: ${id}, message: Cannot update group with id ${id}. Maybe group was not found or req.body is empty!`);
    next(new HttpException(MESSAGE_TYPE.NOT_FOUND, `Cannot update group with id ${id}. Maybe group was not found or req.body is empty!`));
  }
};

export const delateGroup = async (req: express.Request, res: express.Response, next: express.NextFunction) => { // soft delete
  const { id } = req.params;
  logger.info(`service: GroupService, method: delateGroup, params: id: ${id}`)
  const updatedUserResult = await groupServiceInstance.deleteGroup(id);

  if (updatedUserResult === 1) {
    res.send({
      message: `Group with id ${id} was deleted successfully!`
    });
  } else {
    logger.error(`service: GroupService, method: delateGroup, params: id: ${id}, message: Cannot delete group with id ${id}. Maybe group was not found!`);
    next(new HttpException(MESSAGE_TYPE.NOT_FOUND, `Cannot delete group with id ${id}. Maybe group was not found!`));
  }
};

export const getGroupById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  logger.info(`service: GroupService, method: getGroupById, params: id: ${id}`)
  const group: IGroup = await groupServiceInstance.getGroupById(id);

  if (group) {
    res.send(group);
  } else {
    logger.error(`service: GroupService, method: getGroupById, params: id: ${id}, message: Cannot find group with id ${id}. Maybe group was not found!`);
    next(new HttpException(MESSAGE_TYPE.NOT_FOUND, `Cannot find group with id ${id}. Maybe group was not found!`));
  }
};

export const getGroups = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  try {
    logger.info(`service: GroupService, method: getGroups, params: {}`)
    const groups: IGroup[] = await groupServiceInstance.getGroups();
    res.send(groups);
  } catch (e) {
    logger.error(`service: GroupService, method: getGroups, params: {}, message: Some error occurred while getting the groups.`);
  }
};

export const addUsersToGroup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { groupId, userIds } = req.params;
  logger.info(`service: GroupService, method: getGroups, params: { groupId: ${groupId}, userIds: ${userIds}}`)
  const group: IGroup = await groupServiceInstance.addUsersToGroup(groupId, userIds.split(','));

  if (group) {
    res.send(group);
  } else {
    logger.error(`service: GroupService, method: addUsersToGroup, params: { groupId: ${groupId}, userIds: ${userIds}}, message: Some error occurred while adding users to group.`);
    next(new HttpException(MESSAGE_TYPE.NOT_FOUND, `Cannot find group with id ${groupId} or user with id ${userIds.split(',')}!`));
  }
}