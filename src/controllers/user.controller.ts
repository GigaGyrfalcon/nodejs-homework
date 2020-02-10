import { UserInterface, QueryInterface } from '../interfaces';
import * as service from '../services';

export function getUsers(query: QueryInterface) {
  return service.getUsers(query);
}

export function getUserByPk(id: number) {
  return service.getUserByPk(id);
}

export function addUser(body: UserInterface) {
  return service.addUser(body);
}

export function updateUser(id: number, body: UserInterface) {
  return service.updateUser(id, body);
}

export function deleteUser(id: number) {
  return service.deleteUser(id);
}

export function addUsersToGroup(groupId: string, userIds: number[]) {
  return service.addUsersToGroup(groupId, userIds);
}
