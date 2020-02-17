import { GroupInterface } from '../interfaces';
import { Group, UserGroup } from '../models';

export async function getGroups() {
  return await Group.findAll({
    include: [Group.associations.users]
  });
}

export async function getGroupByPk(id: string) {
  return await Group.findByPk(id);
}

export async function addGroup(body: GroupInterface) {
  const newGroup: GroupInterface = { ...body };
  return await Group.create(newGroup);
}

export async function updateGroup(id: string, body: GroupInterface) {
  const updatedGroup: GroupInterface = {
    name: body.name
  };
  if (body.permissions && body.permissions.length > 0) {
    updatedGroup.permissions = body.permissions;
  }
  return await Group.update(updatedGroup, { where: { id } });
}

export async function deleteGroup(id: string) {
  await UserGroup.destroy({ where: { groupId: id } });
  return await Group.destroy({ where: { id }, truncate: false });
}
