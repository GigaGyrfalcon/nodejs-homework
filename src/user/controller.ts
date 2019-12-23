import { User, Query } from './model';
import * as service from './service';

export function getUsers(query: Query) {
  return service.getUsers(query);
}

export function getUserByID(id: string) {
  return service.getUserByID(id);
}

export function addUser(body: User) {
  return service.addUser(body);
}

export function updateUser(id: string, body: User) {
  return service.updateUser(id, body);
}

export function deleteUser(id: string) {
  return service.deleteUser(id);
}
