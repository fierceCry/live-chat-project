import { DataSource } from "typeorm";
import { Message } from './src/messages/message.entity/message.entity';
import dotenv from "dotenv";

dotenv.config();

const dataSource = new DataSource({
  type: "mysql",
  host : process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
    entities: [
      Message
  ],
  migrations: [__dirname + "/src/migrations/*.ts"],
  synchronize: true,
  logging: true,
});
export default dataSource;
