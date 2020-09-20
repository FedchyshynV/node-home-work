import { IGroup } from "../interfaces/group.interface";
import { v4 } from 'uuid';
import db, { sequelize } from "../models";

const groupsTable = db.groups;
const usersTable = db.users;
const Op = db.Sequelize.Op;

export default class GroupService {

  constructor() { }

  async createGroup(group: any): Promise<IGroup> {
    group['id'] = v4();
    group['permissions'] = JSON.parse(group.permissions);
    const createdGroupResult = await groupsTable.create(group);

    return Promise.resolve(createdGroupResult);
  }

  async updateGroup(group: IGroup, id: string): Promise<IGroup> {
    const updatedGroupResult = await groupsTable.update(group, { where: { id }, returning: true });

    return Promise.resolve(updatedGroupResult);
  }

  async deleteGroup(id: string): Promise<number> {
    const deletedGroupResult = await groupsTable.destroy({ where: { id: id } });

    return Promise.resolve(deletedGroupResult);
  }

  async getGroupById(id: string): Promise<IGroup> {
    const group: IGroup = await groupsTable.findByPk(id);

    return Promise.resolve(group);
  }

  async getGroups(): Promise<IGroup[]> {
    const groups = await groupsTable.findAll({ where: null })

    return Promise.resolve(groups);
  }

  async addUsersToGroup(groupId: string, userId: string): Promise<IGroup> {
    return sequelize.transaction((t) => {
      return groupsTable.findByPk(groupId, { transaction: t })
        .then((group: any) => {
          if (!group) {
            return Promise.resolve(undefined);
          }
          return usersTable.findByPk(userId, { transaction: t }).then((user: any) => {
            if (!user) {
              return Promise.resolve(undefined);
            }

            group.addUsers(user);
            return Promise.resolve(group);
          });
        })
    });
  }
}