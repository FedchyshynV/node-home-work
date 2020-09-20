import { dbConfig } from '../../db.config';
import { Sequelize } from 'sequelize';
import { User } from './user.model';
import { Groups } from './group.model';
import { queryTable, queryUser } from '../query/user.query';

export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as any,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },

  define: {
    timestamps: false
  }
});

let db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.authenticate()
  .then(() => { console.log('Connection has been established successfully.'); })
  .catch(err => { console.error('Unable to connect to the database:', err); });

sequelize.query(queryTable)
  .then(() => {
    console.log('Table is successfully created');
  });

sequelize.query(queryUser)
  .then(() => {
    console.log('User is successfully created');
  });

db.users = User(sequelize, Sequelize);
db.groups = Groups(sequelize, Sequelize);

db.users.belongsToMany(db.groups, {
  through: "user_group",
  as: "groups",
  foreignKey: "users_id",
});

db.groups.belongsToMany(db.users, {
  through: "user_group",
  as: "users",
  foreignKey: "groups_id",
});

export default db;