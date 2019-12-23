import uuid from 'uuid-random';
import { User, Query } from './model';

const user1 = {
  id: '374368ac-58c1-492c-8af0-c95d10cecd65',
  login: 'SomeLogin',
  password: 'test1234',
  age: 30,
  isDeleted: false
};

const user2 = {
  id: uuid(),
  login: 'OtherLogin',
  password: '12345678',
  age: 45,
  isDeleted: false
};

export let users: User[] = [user1, user2];

export function getUsers(query: Query) {
  let usersList = [...users];
  usersList = usersList.sort((a: User, b: User) =>
    a.login.toLocaleLowerCase() > b.login.toLocaleLowerCase() ? 1 : -1
  );

  if (query.loginSubstring) {
    usersList = usersList.filter(user =>
      user.login
        .toLocaleLowerCase()
        .includes(String(query.loginSubstring).toLocaleLowerCase())
    );
  }

  if (query.limit) {
    usersList = usersList.slice(0, query.limit);
  }

  return usersList.filter(user => !user.isDeleted);
}

export function getUserByID(id: string) {
  return users.find(user => user.id === id);
}

export function addUser(body: User) {
  const { login, password, age } = body;
  const newUser: User = {
    id: uuid(),
    login: login || '',
    password: password || '',
    age: age || 0,
    isDeleted: false
  };
  users.push(newUser);
  return newUser.id;
}

export function updateUser(id: string, body: User) {
  let message;
  users = users.map(user => {
    if (user.id === id) {
      message = 'ok';
      user.login = body.login ? body.login : user.login;
      user.password = body.password ? body.password : user.password;
      user.age = body.age ? body.age : user.age;
      return user;
    }
    return user;
  });
  return message;
}

export function deleteUser(id: string) {
  let message;
  users = users.map(user => {
    if (user.id === id && !user.isDeleted) {
      message = 'ok';
      user.isDeleted = true;
      return user;
    }
    return user;
  });
  return message;
}
