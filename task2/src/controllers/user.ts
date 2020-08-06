import { User } from "../interfaces/user.interface";
import { MESSAGE_TYPE } from "../enums/status-code.enum";

let users: User[] = [];

export const createUser = (req: any, res: any) => {
  const user = req.body;
  user['id'] = (users.length + 1).toString();
  user['isDeleted'] = false;
  users.push(user);

  res.send(user);
};

export const updateUser = (req: any, res: any) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === id);

  if (users[index]) {
    const user = Object.assign(users[index], req.body);
    users[index] = user;
    res.send(user);
  } else {
    res.statusCode = MESSAGE_TYPE.NOT_FOUND;
    res.end();
  }
};

export const delateUser = (req: any, res: any) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === id);

  if (users[index]) {
    users[index].isDeleted = true;
  
    res.send(users[index]);
  } else {
    res.statusCode = MESSAGE_TYPE.NOT_FOUND;
    res.end();
  }
};

export const getUsersById = (req: any, res: any) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === id);

  if (users[index]) {
  
    res.send(users[index]);
  } else {
    res.statusCode = MESSAGE_TYPE.NOT_FOUND;
    res.end();
  }
};

export const getUsers = (req: any, res: any) => {
  const { limit = users.length, search = '' } = req.query;
  const matchesUsers = users
    .sort((a: User, b: User) =>  (a.login > b.login ? 1 : -1))
    .filter((user) => user.login.includes(search))
    .filter((user, index) => index + 1 <= limit);

  res.send(matchesUsers);
};
