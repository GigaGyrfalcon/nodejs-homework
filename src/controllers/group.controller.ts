import { GroupInterface } from '../interfaces';
import * as service from '../services/group.service';

export function getGroups() {
  return service.getGroups();
}

export function getGroupByPk(id: string) {
  return service.getGroupByPk(id);
}

export function addGroup(body: GroupInterface) {
  return service.addGroup(body);
}

export function updateGroup(id: string, body: GroupInterface) {
  return service.updateGroup(id, body);
}

export function deleteGroup(id: string) {
  return service.deleteGroup(id);
}
