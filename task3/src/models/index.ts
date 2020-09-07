import { dbConfig } from '../../db.config';
import { Sequelize } from 'sequelize';
import { User } from './user.model';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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


const queryTable = `
CREATE TABLE users (
  id character varying(255) COLLATE pg_catalog."default" NOT NULL,
  login character varying(255) COLLATE pg_catalog."default",
  password character varying(255) COLLATE pg_catalog."default",
  age integer,
  "isDeleted" boolean,
  CONSTRAINT users_pkey PRIMARY KEY (id)
  );
  `;
  
  const queryUser = `
  INSERT INTO public.users(
    "id", "login", "password", "age", "isDeleted")
    VALUES ('1', 'John Dou', 'admin1', 18, false);
    `;
    
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

export default db;