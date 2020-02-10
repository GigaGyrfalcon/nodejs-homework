import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../data-access/db';
import { Group } from '.';

export class User extends Model {
  public id!: number;
  public login!: string;
  public password!: string;
  public age!: number;
  public isDeleted!: boolean;

  public readonly groups?: Group[];

  public static associations: {
    groups: Association<User, Group>;
  };
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
    sequelize: sequelize,
    timestamps: false
  }
);
