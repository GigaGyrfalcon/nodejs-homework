import { UserInterface, QueryInterface } from '../interfaces';
import { User, UserGroup } from '../models';
import { Op, FindOptions } from 'sequelize';
import { sequelize } from '../data-access/db';

export async function getUsers(query: QueryInterface) {
  const selectQuery: FindOptions = {
    where: {
      isDeleted: false
    },
    order: [['login', 'ASC']]
  };
  if (query.loginSubstring) {
    selectQuery.where = {
      ...selectQuery.where,
      login: { [Op.iLike]: `%${query.loginSubstring}%` }
    };
  }
  if (query.limit) {
    selectQuery.limit = query.limit;
  }
  selectQuery.include = [User.associations.groups];
  return await User.findAll(selectQuery);
}

export async function getUserByPk(id: number) {
  return await User.findByPk(id);
}

export async function addUser(body: UserInterface) {
  const newUser: UserInterface = { ...body, isDeleted: false };
  return await User.create(newUser);
}

export async function updateUser(id: number, body: UserInterface) {
  return await User.update({ login: body.login }, { where: { id } });
}

export async function deleteUser(id: number) {
  return await User.update({ isDeleted: true }, { where: { id } });
}

export async function addUsersToGroup(groupId: string, userIds: number[]) {
  return await sequelize.transaction(async t => {
    const promises: Promise<any>[] = [];
    userIds.forEach(userId => {
      promises.push(UserGroup.create({ groupId, userId }));
    });
    return await Promise.all(promises);
  });
}
