-- Add up migration script here
CREATE TABLE user_table (
  id VARCHAR PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(24) NOT NULL,
  email VARCHAR(30) UNIQUE NOT NULL
);
CREATE index user_table_id on user_table(email);