export const queryTable = `
CREATE TABLE users (
  id character varying(255) COLLATE pg_catalog."default" NOT NULL,
  login character varying(255) COLLATE pg_catalog."default",
  password character varying(255) COLLATE pg_catalog."default",
  age integer,
  "isDeleted" boolean,
  CONSTRAINT users_pkey PRIMARY KEY (id)
  );
  `;
  
export const queryUser = `
  INSERT INTO public.users(
    "id", "login", "password", "age", "isDeleted")
    VALUES ('1', 'John Dou', 'admin1', 18, false);
    `;