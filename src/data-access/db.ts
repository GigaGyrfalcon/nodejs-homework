import { Sequelize } from 'sequelize';

export const sequelize: Sequelize = new Sequelize(
  'db',
  'postgres',
  '1234qwer',
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
