import { QueryInterface, UserInterface } from '../../interfaces';

const fakeUser = {
  login: 'giga',
  password: '$2b$10$BxnJg6O20jSDKQ7BWQpCjucNSVIBGtHk91UYe7OEfVdKSbyj2w1Eq',
  age: 38,
  isDeleted: false
};

const fakeNewUser = {
  id: 6,
  login: 'John',
  password: '$2b$10$.BxdxuxmYJCagqwjOsKelOdLTQcwd8QuMyXqpzeCwhBQJs4uUQlt6',
  age: 81,
  isDeleted: false
};

export async function getUsers(query: QueryInterface) {
  if (query.loginSubstring === 'unknown') {
    return await new Promise((resolve, _reject) => resolve([]));
  }
  return await new Promise((resolve, _reject) => resolve([fakeUser]));
}

export async function getUserByPk(id: number) {
  if (id === 1) {
    return await new Promise((resolve, _reject) => resolve(fakeUser));
  }
  return await new Promise((resolve, _reject) => resolve(null));
}

export async function getUserByLogin() {
  return await new Promise((resolve, _reject) => resolve(fakeUser));
}

export async function addUser() {
  return await new Promise((resolve, _reject) => resolve(fakeNewUser));
}

export async function updateUser(id: number) {
  if (id === 1) {
    return await new Promise((resolve, _reject) => resolve([1]));
  }
  return await new Promise((resolve, _reject) => resolve([0]));
}

export async function deleteUser(id: number) {
  if (id === 1) {
    return await new Promise((resolve, _reject) => resolve([1]));
  }
  return await new Promise((resolve, _reject) => resolve([0]));
}

export async function addUsersToGroup(groupId: string, userIds: number[]) {
  if (groupId === '1') {
    return await new Promise((resolve, _reject) => resolve([{}]));
  }
  return await new Promise((resolve, _reject) => resolve([]));
}
