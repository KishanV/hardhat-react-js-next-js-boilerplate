import { Connection } from "typeorm";
import { Bot } from "./entities/bots";

const connection = new Connection({
  type: "postgres",
  host: "localhost",
  database: "crypto-bot-db",
  password: "123",
  port: 7878,
  username: "postgres",
  synchronize: true,
  entities: [Bot],
});

let conn: Connection;
export const getConnection = async <T>() => {
  if (conn === undefined) conn = await connection.connect();
  return conn;
};
