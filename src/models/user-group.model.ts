import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../data-access/db';

export class UserGroup extends Model {
  public userId!: number;
  public groupId!: string;
}

UserGroup.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id'
      }
    }
  },
  {
    tableName: 'UserGroup',
    sequelize: sequelize,
    timestamps: false
  }
);
