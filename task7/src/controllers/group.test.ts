import bodyParser = require('body-parser');
import * as express from 'express';
import * as request from 'supertest';
import { Permissions } from '../interfaces/group.interface'
import { createGroup, updateGroup, delateGroup, getGroupById, getGroups, addUsersToGroup } from './group';

const groups = [
  {
    id: 1,
    name: 'Jhon Dou',
    permissions: [Permissions.READ, Permissions.WRITE]
  },
  {
    id: 2,
    name: 'Jhon Dou',
    permissions: [Permissions.READ, Permissions.WRITE]
  }
];

jest.mock('../services/group.service', () => ({
  GroupService: class {
    getGroups = jest.fn(() => groups);
    updateGroup = jest.fn(() => [1, [groups[0]]]);
    deleteGroup = jest.fn(() => 1);
    getGroupById = jest.fn(() => groups[0]);
    createGroup = jest.fn(() => ({
      name: 'Jhon Dou',
      permissions: [Permissions.READ, Permissions.WRITE]
    }));
    addUsersToGroup = jest.fn(() => groups[0]);
  }
}));

const app = express();

describe('group controller', () => {
  describe('#getUsers', () => {
    beforeEach(() => {
      app.get("/groups", getGroups);
    });

    it("GET /groups - success", async () => {

      const { body } = await request(app).get("/groups");
      expect(body).toEqual(groups);
    });
  });

  describe('#getGroupById', () => {
    beforeEach(() => {
      app.get("/groups/:id", getGroupById);
    });

    it("GET /groups/:id - success", async done => {

      const { body } = await request(app).get("/groups/1");
      expect(body).toEqual(groups[0]);
      done();
    });
  });

  describe('#updateGroup', () => {
    beforeEach(() => {
      app.put("/groups/:id", updateGroup);
    });

    it("PUT /groups/:id - success", async () => {

      const { body } = await request(app).put("/groups/1");
      expect(body).toEqual(groups[0]);
    });
  });

  describe('#createGroup', () => {
    beforeEach(() => {
      app.post("/groups", createGroup);
    });

    it('POST /users - success', async () => {

      const { body } = await request(app).post("/groups");
      expect(body).toEqual({
        name: 'Jhon Dou',
        permissions: [Permissions.READ, Permissions.WRITE]
      });
    });
  });

  describe('#delateGroup', () => {
    beforeEach(() => {
      app.delete("/groups/:id", delateGroup);
    });

    it("DELETE /groups/:id - success", async () => {

      const { body } = await request(app).delete("/groups/1");
      expect(body).toEqual({ message: "Group with id 1 was deleted successfully!" });
    });
  });

  describe('#addUsersToGroup', () => {
    beforeEach(() => {
      app.get("/groups/:groupId/users/:userIds", addUsersToGroup);
    });

    it("GET /groups/:groupId/users/:userIds - success", async () => {

      const { body } = await request(app).get("/groups/1/users/1");
      expect(body).toEqual(groups[0]);
    });
  });
});