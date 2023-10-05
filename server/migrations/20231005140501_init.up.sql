-- Add up migration script here
CREATE TABLE IF NOT EXISTS `user_table` (
  `id` VARCHAR PRIMARY KEY NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR NOT NULL,
  `email` VARCHAR UNIQUE NOT NULL
);
CREATE index user_table_id on user_table(email);
