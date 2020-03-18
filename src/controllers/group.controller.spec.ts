import { Request, Response } from 'express';
import { validate } from 'joi';
import {
  getGroups,
  getGroupByPk,
  addGroup,
  updateGroup,
  deleteGroup
} from './group.controller';
import * as service from '../services/group.service';
jest.mock('../schemas/group.schema');

jest.mock('sequelize');
jest.mock('joi', () => ({
  validate: jest.fn()
}));
jest.mock('../services/group.service', () => ({
  getGroups: jest.fn(),
  getGroupByPk: jest.fn(),
  addGroup: jest.fn(),
  updateGroup: jest.fn(),
  deleteGroup: jest.fn()
}));

const fakeGroup = {
  id: 'b470914b-637f-4701-8552-c3f60342b27e',
  name: 'Employee',
  permissions: ['READ', 'SHARE'],
  users: []
};

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

describe('group controller', () => {
  it('getGroupByPk: should call response json method with group', async () => {
    const mockedGetGroupByPk = service.getGroupByPk as jest.Mock;
    mockedGetGroupByPk.mockResolvedValue(fakeGroup);

    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({}, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await getGroupByPk(req, res);
    expect(resJSONSpyFn).toBeCalledWith(
      expect.objectContaining({
        name: 'Employee'
      })
    );
  });

  it('getGroupByPk: should call response json method with group', async () => {
    const mockedGetGroupByPk = service.getGroupByPk as jest.Mock;
    mockedGetGroupByPk.mockResolvedValue(null);

    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({}, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await getGroupByPk(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith('Group could not found');
  });

  it('getGroups: should call response json method with groups array', async () => {
    const mockedGetGroups = service.getGroups as jest.Mock;
    mockedGetGroups.mockResolvedValue([fakeGroup]);
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({}, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await getGroups(req, res);
    expect(resJSONSpyFn).toBeCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Employee'
        })
      ])
    );
  });

  it('getGroups: should call response json method with empty array', async () => {
    const mockedGetGroups = service.getGroups as jest.Mock;
    mockedGetGroups.mockResolvedValue([]);
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({}, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await getGroups(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith('Groups could not found');
  });

  it('addGroup: should call response json method with new group', async () => {
    const mockedAddGroup = service.addGroup as jest.Mock;
    mockedAddGroup.mockResolvedValue(fakeGroup);

    const mockedValidate = validate as jest.Mock;
    mockedValidate.mockReturnValue({ error: null });

    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({}, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await addGroup(req, res);
    expect(resJSONSpyFn).toBeCalledWith(
      expect.objectContaining({
        name: 'Employee'
      })
    );
  });

  it('addGroup: should not pass validation', async () => {
    const mockedValidate = validate as jest.Mock;
    mockedValidate.mockReturnValue({ error: 'invalid' });

    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({}, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await addGroup(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith('invalid');
  });

  it('updateGroup: should call response json method with quantiry of updated groups', async () => {
    const mockedUpdateGroup = service.updateGroup as jest.Mock;
    mockedUpdateGroup.mockResolvedValue([1]);

    const mockedValidate = validate as jest.Mock;
    mockedValidate.mockReturnValue({ error: null });
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({ id: '1' }, {}, { name: 'Athletes' });
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await updateGroup(req, res);
    expect(resJSONSpyFn).toBeCalledWith(1);
  });

  it('updateGroup: should not delete', async () => {
    const mockedUpdateGroup = service.updateGroup as jest.Mock;
    mockedUpdateGroup.mockResolvedValue([0]);

    const mockedValidate = validate as jest.Mock;
    mockedValidate.mockReturnValue({ error: null });
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({ id: '0' }, {}, { name: 'Athletes' });
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await updateGroup(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith('Group did not update');
  });

  it('updateGroup: should not pass validation', async () => {
    const mockedValidate = validate as jest.Mock;
    mockedValidate.mockReturnValue({ error: { message: 'invalid' } });
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({ id: '0' }, {}, { name: 'Athletes' });
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await updateGroup(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith({ message: 'invalid' });
  });

  it('deleteGroup: should call response json method with quantiry of deleted groups', async () => {
    const mockedDeleteGroup = service.deleteGroup as jest.Mock;
    mockedDeleteGroup.mockResolvedValue(1);

    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({ id: '1' }, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await deleteGroup(req, res);
    expect(resJSONSpyFn).toBeCalledWith(1);
  });

  it('deleteGroup: should not delete', async () => {
    const mockedDeleteGroup = service.deleteGroup as jest.Mock;
    mockedDeleteGroup.mockResolvedValue(0);

    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });
    const req = mockRequest({ id: '0' }, {}, {});
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    await deleteGroup(req, res);
    expect(resStatusSpyFn).toBeCalledWith(400);
    expect(resStatusJSONSpyFn).toBeCalledWith('Group did not delete');
  });
});
