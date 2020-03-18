import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import { authenticate } from './auth.controller';

jest.mock('sequelize');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');
jest.mock('../services/user.service');

const mockRequest = (spyFns: any[]) =>
  (({
    app: {
      get: spyFns[0]
    },
    body: {
      login: 'Gyrfalcon',
      password: '1234qwer'
    },
    method: 'POST'
  } as unknown) as Request);

const mockResponse = (spyFns: any[]) =>
  (({
    json: spyFns[0],
    status: spyFns[1],
    sendStatus: spyFns[2]
  } as unknown) as Response);

describe('auth controller', () => {
  const token = 'some_token';
  const mockedCompareSync = compareSync as jest.Mock;
  const mockedsign = sign as jest.Mock;

  it('authenticate: should call response json method with token', async () => {
    const reqAppGetSpyFn = jest.fn(() => 'some_jwt_private_key');
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => resStatusJSONSpyFn);

    const req = mockRequest([reqAppGetSpyFn]);
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    mockedCompareSync.mockImplementationOnce(() => true);
    mockedsign.mockImplementationOnce(() => token);
    await authenticate(req, res);

    expect(reqAppGetSpyFn).toHaveBeenCalled();
    expect(resJSONSpyFn).toBeCalledWith(token);
  });

  it('authenticate: user not found', async () => {
    const reqAppGetSpyFn = jest.fn(() => 'some_jwt_private_key');
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });

    const req = mockRequest([reqAppGetSpyFn]);
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    mockedCompareSync.mockImplementationOnce(() => false);
    mockedsign.mockImplementationOnce(() => token);
    await authenticate(req, res);

    expect(reqAppGetSpyFn).toHaveBeenCalled();
    expect(resStatusSpyFn).toBeCalledWith(401);
    expect(resStatusJSONSpyFn).toBeCalledWith('User could not found');
  });

  it('authenticate: throw error', async () => {
    const reqAppGetSpyFn = jest.fn(() => 'some_jwt_private_key');
    const resJSONSpyFn = jest.fn();
    const resStatusJSONSpyFn = jest.fn();
    const resStatusSpyFn = jest.fn(() => {
      return { json: resStatusJSONSpyFn };
    });

    const req = mockRequest([reqAppGetSpyFn]);
    const res = mockResponse([resJSONSpyFn, resStatusSpyFn]);
    mockedCompareSync.mockImplementationOnce(() => {
      throw 'Test error';
    });
    mockedsign.mockImplementationOnce(() => token);
    await authenticate(req, res);

    expect(reqAppGetSpyFn).toHaveBeenCalled();
    expect(resStatusSpyFn).toBeCalledWith(401);
    expect(resStatusJSONSpyFn).toBeCalledWith('Test error');
  });
});
