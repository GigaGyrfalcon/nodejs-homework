import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../data-access/db';
import { Permissions } from '../types';
import { User } from '.';

export class Group extends Model {
  public id!: string;
  public name!: string;
  public permissions!: Array<Permissions>;

  public readonly users?: User[];

  public static associations: {
    users: Association<Group, User>;
  };
}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  },
  {
    tableName: 'groups',
    sequelize: sequelize,
    timestamps: false
  }
);
