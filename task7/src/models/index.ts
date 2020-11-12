import { Sequelize } from 'sequelize';
import { User } from './user.model';
import { Groups } from './group.model';
import { queryTable, queryUser } from '../query/user.query';
require('dotenv').config();

export const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as any,

  pool: {
    max: +process.env.DB_POOL_MAX,
    min: +process.env.DB_POOL_MIN,
    acquire: +process.env.DB_POOL_ACQUIRE,
    idle: +process.env.DB_POOL_IDLE
  },

  define: {
    timestamps: false
  }
});

let db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.authenticate()
  .then(() => { 
    // console.log('Connection has been established successfully.'); 
  })
  .catch(err => { 
    // console.error('Unable to connect to the database:', err); 
  });

sequelize.query(queryTable)
  .then(() => {
    // console.log('Table is successfully created');
  });

sequelize.query(queryUser)
  .then(() => {
    // console.log('User is successfully created');
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