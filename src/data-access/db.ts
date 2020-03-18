import { Sequelize } from 'sequelize';

export const sequelize: Sequelize = new Sequelize(
  process.env.DB_CONNECT || '',
  {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
