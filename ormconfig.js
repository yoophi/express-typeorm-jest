require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const baseConfig = {
  type: "postgres",
  dropSchema: true,
  synchronize: true,
  logging: false,
  migrationsRun: true,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

const config = {
  development: {
    ...baseConfig,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
  },
  prod: {
    ...baseConfig,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
  },
  test: {
    ...baseConfig,
    host: process.env.DB_TEST_HOST,
    port: process.env.DB_TEST_PORT,
    username: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_DATABASE,
    logging: true,
  },
};

module.exports = config[env];
