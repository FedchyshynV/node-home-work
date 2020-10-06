import { IUser } from "../interfaces/user.interface";
import { v4 } from 'uuid';
import db from "../models";
const usersTable = db.users;
const Op = db.Sequelize.Op;

export default class UserService {

  constructor(){}

  async createUser(user: any): Promise<IUser>{
    user['id'] = v4();
    user['isDeleted'] = false;
    const createdUserResult = await usersTable.create(user);
    
    return createdUserResult;
 } 

  async updateUser(user: IUser, id: string): Promise<any>{
    const updatedUserResult = await usersTable.update(user, { where: { id }, returning: true });
    
    return updatedUserResult;
 } 

 async deleteUser(user: IUser, id: string): Promise<number>{
    user.isDeleted = true;
    const updatedUserResult = (await usersTable.update(user, { where: { id } }))[0];
    return updatedUserResult;
 }

  async getUsersById(id: string): Promise<IUser> {
    const user: IUser = await usersTable.findByPk(id);
    return user;
  }

 async getUsers(limit: any, search: any): Promise<IUser[]> {
    var condition = search ? { login: { [Op.iLike]: `%${search}%` } } : null;
    const users = await usersTable.findAll({
      where: condition,
      limit: limit,
      order: [
        ['login', 'ASC']
      ]
    });
  
    return users;
  }
}