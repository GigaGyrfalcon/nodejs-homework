import { sequelize } from './db';
import { USERS as _USERS, GROUPS as _GROUPS } from './seed';
import { User, Group, UserGroup } from '../models';

export function sequelizer(): void {
  (async () => {
    try {
      await sequelize.sync({
        logging: console.log,
        force: true
      });
      await User.bulkCreate(_USERS);
      await Group.bulkCreate(_GROUPS);

      User.belongsToMany(Group, {
        as: 'Group',
        through: 'UserGroup',
        foreignKey: 'userId'
      });
      Group.belongsToMany(User, {
        as: 'User',
        through: 'UserGroup',
        foreignKey: 'groupId'
      });
      User.hasMany(UserGroup, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'groups'
      });
      Group.hasMany(UserGroup, {
        sourceKey: 'id',
        foreignKey: 'groupId',
        as: 'users'
      });

      const user = await User.create({
        login: 'King',
        password: '12345678',
        age: 55,
        isDeleted: false
      });

      const user2 = await User.create({
        login: 'Queen',
        password: '87654321',
        age: 46,
        isDeleted: false
      });
      const group = await Group.create({
        name: 'Puppet',
        permissions: ['READ']
      });

      await UserGroup.create({ userId: user.id, groupId: group.id });
      await UserGroup.create({ userId: user2.id, groupId: group.id });

      console.log('Connection has been established successfully.');
    } catch (err) {
      console.error(err);
    }
  })();
}
