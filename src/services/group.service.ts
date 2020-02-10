import { GroupInterface } from '../interfaces';
import { Group, UserGroup } from '../models';

export async function getGroups() {
  try {
    const result = await Group.findAll({
      include: [Group.associations.users]
    });
    return { isError: false, message: 'Groups selected', result };
  } catch (error) {
    return { isError: true, error, message: 'Groups could not selected' };
  }
}

export async function getGroupByPk(id: string) {
  try {
    const result = await Group.findByPk(id);
    return { isError: false, message: 'Group selected', result };
  } catch (error) {
    return { isError: true, error, message: 'Group could not selected' };
  }
}

export async function addGroup(body: GroupInterface) {
  try {
    const { name, permissions } = body;
    const newGroup: GroupInterface = {
      name: name || '',
      permissions: permissions || []
    };
    const result = await Group.create(newGroup);
    return { isError: false, message: 'Group added', result };
  } catch (error) {
    return { isError: true, error, message: 'Group could not be added' };
  }
}

export async function updateGroup(id: string, body: GroupInterface) {
  try {
    const updatedGroup: GroupInterface = {
      name: body.name
    };
    if (body.permissions && body.permissions.length > 0) {
      updatedGroup.permissions = body.permissions;
    }
    const result = await Group.update(updatedGroup, { where: { id } });
    return { isError: false, message: 'Group updated', result };
  } catch (error) {
    return { isError: true, error, message: 'Group could not be updated' };
  }
}

export async function deleteGroup(id: string) {
  try {
    await UserGroup.destroy({ where: { groupId: id } });
    const result = await Group.destroy({ where: { id }, truncate: false });
    return { isError: false, message: 'Group deleted', result };
  } catch (error) {
    return { isError: true, error, message: 'Group could not be deleted' };
  }
}
