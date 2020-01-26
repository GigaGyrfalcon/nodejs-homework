import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../data-access/db';

export class User extends Model {
  public id!: number;
  public login!: string;
  public password!: string;
  public age!: number;
  public isDeleted!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: 'users',
    sequelize: sequelize
  }
);
