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

    return createdGroupResult;
  }

  async updateGroup(group: IGroup, id: string): Promise<IGroup> {
    const updatedGroupResult = await groupsTable.update(group, { where: { id }, returning: true });

    return updatedGroupResult;
  }

  async deleteGroup(id: string): Promise<number> {
    const deletedGroupResult = await groupsTable.destroy({ where: { id: id } });

    return deletedGroupResult;
  }

  async getGroupById(id: string): Promise<IGroup> {
    const group: IGroup = await groupsTable.findByPk(id);

    return group;
  }

  async getGroups(): Promise<IGroup[]> {
    const groups = await groupsTable.findAll({ where: null })

    return groups;
  }

  async addUsersToGroup(groupId: string, userIds: string[]): Promise<IGroup> {
    var condition = {id: { [Op.in]: userIds } };
    return sequelize.transaction((t) => {
      return groupsTable.findByPk(groupId, { transaction: t })
        .then((group: any) => {
          if (!group) {
            return Promise.resolve(undefined);
          }
          return usersTable.findAll( { where: condition, transaction: t }).then((users: any) => {
            if (!users) {
              return Promise.resolve(undefined);
            }

            group.addUsers([...users]);
            return group;
          });
        })
    });
  }
}