import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Message } from './src/messages/message.entity/message.entity';

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
  synchronize: false,
  logging: true,
});
export default dataSource;
