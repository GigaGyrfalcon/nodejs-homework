import { Request, Response } from 'express';
import { validate } from 'joi';
import {
  getUserByPk,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  addUsersToGroup
} from './user.controller';

jest.mock('../services/user.service');
jest.mock('../schemas/user.schema');
jest.mock('sequelize');
jest.mock('joi', () => ({
  validate: jest.fn()
}));

const mockRequest = (params: any, query: any, body: any) =>
  (({
    params,
    query,
    body,
    method: 'POST'
  } as unknown) as Request);

const mockResponse = (spyFns: any[]) =>
  (({
    json: spyFns[0],
    status: spyFns[1],
    sendStatus: spyFns[2]
  } as unknown) as Response);

describe('user controller', () => {
  it('getUsers: should call response json method with users array', async () => {
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({}, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await getUsers(req, res);
    expect(resJSONSpyFn).toBeCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          login: 'giga'
        })
      ])
    );
  });

  it('getUsers: should call response json method with empty array', async () => {
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({}, { loginSubstring: 'unknown' }, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await getUsers(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith('Users could not found');
  });

  it('getUserByPk: should call response json method with user', async () => {
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({ id: '1' }, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await getUserByPk(req, res);
    expect(resJSONSpyFn).toBeCalledWith(
      expect.objectContaining({
        login: 'giga'
      })
    );
  });

  it('getUserByPk: should call response json method with null', async () => {
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({ id: '0' }, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await getUserByPk(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith('User could not found');
  });

  it('addUser: should call response json method with new user', async () => {
    const mockedValidate = validate as jest.Mock;
    mockedValidate.mockReturnValue({ error: null });
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({}, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await addUser(req, res);
    expect(resJSONSpyFn).toBeCalledWith(
      expect.objectContaining({
        login: 'John'
      })
    );
  });

  it('addUser: should not pass validation', async () => {
    const mockedValidate = validate as jest.Mock;
    mockedValidate.mockReturnValue({ error: 'invalid' });
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({}, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await addUser(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith('invalid');
  });

  it('updateUser: should call response json method with quantiry of updated users', async () => {
    const mockedValidate = validate as jest.Mock;
    mockedValidate.mockReturnValue({ error: null });
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest(
      { id: '1' },
      {},
      { login: 'Larry', password: '1q2w3e4r', age: 86 }
    );
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await updateUser(req, res);
    expect(resJSONSpyFn).toBeCalledWith(1);
  });

  it('updateUser: should not delete', async () => {
    const mockedValidate = validate as jest.Mock;
    mockedValidate.mockReturnValue({ error: null });
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest(
      { id: '0' },
      {},
      { login: 'Larry', password: '1q2w3e4r', age: 86 }
    );
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await updateUser(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith('User did not update');
  });

  it('updateUser: should not pass validation', async () => {
    const mockedValidate = validate as jest.Mock;
    mockedValidate.mockReturnValue({ error: { message: 'invalid' } });
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest(
      { id: '1' },
      {},
      { login: 'Larry', password: '1q2w3e4r', age: 86 }
    );
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await updateUser(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith('invalid');
  });

  it('deleteUser: should call response json method with quantiry of deleted users', async () => {
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({ id: '1' }, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await deleteUser(req, res);
    expect(resJSONSpyFn).toBeCalledWith(1);
  });

  it('deleteUser: should not delete', async () => {
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({ id: '0' }, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await deleteUser(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith('User did not delete');
  });

  it('addUsersToGroup: should call response json method with array of users in group', async () => {
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({}, {}, { groupId: '1' });
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await addUsersToGroup(req, res);
    expect(resJSONSpyFn).toBeCalledWith([{}]);
  });

  it('addUsersToGroup: should call response json method with array of users in group', async () => {
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({}, {}, { groupId: '0' });
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await addUsersToGroup(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith('Users could not added to group');
  });
});
