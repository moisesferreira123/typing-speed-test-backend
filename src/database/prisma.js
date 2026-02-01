import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../prisma/generated/client.ts";

const adapter = new PrismaMariaDb({
  host: "gateway01.us-east-1.prod.aws.tidbcloud.com",
  port: 4000,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  ssl: {
    rejectUnauthorized: true,
  },
});
const prisma = new PrismaClient({adapter});

export default prisma;