import { Sequelize } from 'sequelize';

export const sequelize: Sequelize = new Sequelize(
  'postgres://omvevehy:ITicWjTA-puPNLT7DbtS3uume2bJbWXb@balarama.db.elephantsql.com:5432/omvevehy',
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
