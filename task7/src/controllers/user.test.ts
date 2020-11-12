import bodyParser = require('body-parser');
import * as express from 'express';
import * as request from 'supertest';
import { createUser, getUsers, getUsersById, updateUser, delateUser, login } from './user';

const users = [
  {
    id: 1,
    login: 'Jhon Dou',
    password: 12345,
    age: 20,
    isDeleted: false
  },
  {
    id: 2,
    login: 'Jhon Dou',
    password: 12345,
    age: 20,
    isDeleted: false
  }
];

jest.mock('../services/user.service', () => ({
  UserService: class {
    getUsers = jest.fn(() => users);
    getUsersById = jest.fn(() => users[0]);
    updateUser = jest.fn(() => [1, [users[0]]]);
    createUser = jest.fn(() => ({
      login: 'Jhon Dou',
      password: 'sdfgsdfg',
      age: 20
    }));
    deleteUser = jest.fn(() => 1);
    getUser = jest.fn(() => users[0]);
  }
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => {})
}));


const app = express();

describe('user controller', () => {
  describe('#getUsers', () => {
    beforeEach(() => {
      app.get("/users", getUsers);
    });

    it("GET /users - success", async () => {

      const { body } = await request(app).get("/users");
      expect(body).toEqual(users);
    });
  });

  describe('#getUsersById', () => {
    beforeEach(() => {
      app.get("/users/:id", getUsersById);
    });

    it("GET /users/:id - success", async done => {

      const { body } = await request(app).get("/users/1");
      expect(body).toEqual(users[0]);
      done();
    });
  });

  describe('#updateUser', () => {
    beforeEach(() => {
      app.put("/users/:id", updateUser);
    });

    it("PUT /users/:id - success", async () => {

      const { body } = await request(app).put("/users/1");
      expect(body).toEqual(users[0]);
    });
  });

  describe('#createUser', () => {
    beforeEach(() => {
      app.post("/users", createUser);
    });

    it('POST /users - success', async () => {

      const { body } = await request(app).post("/users");
      expect(body).toEqual({
        login: 'Jhon Dou',
        password: 'sdfgsdfg',
        age: 20
      });
    })
  })

  describe('#delateUser', () => {
    beforeEach(() => {
      app.delete("/users/:id", delateUser);
    });

    it("DELETE /users/:id - success", async () => {

      const { body } = await request(app).delete("/users/1");
      expect(body).toEqual({message: "User with id 1 was deleted successfully!"});
    });
  });

  describe('#login', () => {
    beforeEach(() => {
      app.use(bodyParser.json());
      app.post("/login", login);
    });

    it("POST /login - success", async () => {
      
      const { body } = await request(app).post("/login").send(users[0]);
      expect(body).toEqual({});
    });
  });

});
