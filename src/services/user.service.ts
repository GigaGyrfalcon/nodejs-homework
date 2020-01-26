import { UserInterface, QueryInterface } from '../interfaces';
import { User } from '../models/user.model';
import { Op, FindOptions } from 'sequelize';

export async function getUsers(query: QueryInterface) {
  try {
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
    const result = await User.findAll(selectQuery);
    return { isError: false, message: 'Users selected', result };
  } catch (error) {
    return { isError: true, error, message: 'Users could not selected' };
  }
}

export async function getUserByPk(id: number) {
  try {
    const result = await User.findByPk(id);
    return { isError: false, message: 'User selected', result };
  } catch (error) {
    return { isError: true, error, message: 'User could not selected' };
  }
}

export async function addUser(body: UserInterface) {
  try {
    const { login, password, age } = body;
    const newUser: UserInterface = {
      login: login || '',
      password: password || '',
      age: age || 0,
      isDeleted: false
    };
    const result = await User.create(newUser);
    return { isError: false, message: 'User added', result };
  } catch (error) {
    return { isError: true, error, message: 'User could not be added' };
  }
}

export async function updateUser(id: number, body: UserInterface) {
  try {
    const result = await User.update({ login: body.login }, { where: { id } });
    return { isError: false, message: 'User updated', result };
  } catch (error) {
    return { isError: true, error, message: 'User could not be updated' };
  }
}

export async function deleteUser(id: number) {
  try {
    const result = await User.update({ isDeleted: true }, { where: { id } });
    return { isError: false, message: 'User deleted', result };
  } catch (error) {
    return { isError: true, error, message: 'User could not be deleted' };
  }
}
