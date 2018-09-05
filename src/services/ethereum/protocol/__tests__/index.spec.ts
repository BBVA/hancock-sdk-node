import fetch from 'isomorphic-fetch';
import 'jest';
import { HancockEthereumProtocolClient } from '..';
import * as response from '../../__mocks__/responses';
import * as common from '../../common';
import { HancockError, hancockErrorType } from '../../error';
import * as errorUtils from '../../utils';

jest.mock('isomorphic-fetch');
jest.mock('../../utils');
jest.mock('../../common');

describe('HancockEthereumProtocolClient', async () => {

  let client: HancockEthereumProtocolClient;
  const errorFnMock = errorUtils.error as jest.Mock;
  const genericConfig = {
    host: 'genericHost',
    port: 1,
    base: 'genericBase',
    resources: { resource: 'genericResource' },
  };
  let config: any;
  const configAdapter: any = genericConfig;
  const configWallet: any = genericConfig;
  const configBroker: any = genericConfig;
  let callParamFetch: any;
  let encodeBody: any;

  const checkStatusMock: jest.Mock = common.checkStatus as any;
  const errorHandlerMock: jest.Mock = common.errorHandler as any;

  beforeEach(() => {
    config = {
      adapter: configAdapter,
      wallet: configWallet,
      broker: configBroker,
    };

    client = new HancockEthereumProtocolClient(config);

    callParamFetch = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'method',
        from: 'from',
        params: ['params'],
        action: 'send',
      }),
    };

    encodeBody = {
      action: 'transfer',
      body: {
        value: '1000',
        to: '0xde8e772f0350e992ddef81bf8f51d94a8ea92123',
        data: 'dataTest',
      },
      dlt: 'ethereum',
    };

    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should call encodeProtocol correctly', async () => {

    (fetch as any).once(JSON.stringify(response.SC_INVOKE_ADAPT_RESPONSE));
    callParamFetch.body = JSON.stringify(encodeBody);

    const checkStatusSpy = checkStatusMock
      .mockImplementation((res) => Promise.resolve(res.json()));

    const result = await client.encodeProtocol('transfer', '1000', '0xde8e772f0350e992ddef81bf8f51d94a8ea92123', 'dataTest', 'ethereum');

    expect(fetch).toHaveBeenCalledWith(
      'genericHost:1genericBase/mockEncode',
      callParamFetch,
    );
    expect(checkStatusSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(response.SC_INVOKE_ADAPT_RESPONSE);

  });

  it('should call encodeProtocol and throw error', async () => {

    (fetch as any).mockRejectOnce(JSON.stringify(response.ERROR));
    callParamFetch.body = JSON.stringify(encodeBody);

    const checkStatusSpy = errorHandlerMock
      .mockImplementation(() => { throw new HancockError(hancockErrorType.Api, '001', 500, 'testError'); });

    try {
      await client.encodeProtocol('transfer', '1000', '0xde8e772f0350e992ddef81bf8f51d94a8ea92123', 'dataTest', 'ethereum');
      fail('it should fail');
    } catch (error) {
      expect(fetch).toHaveBeenCalledWith(
        'genericHost:1genericBase/mockEncode',
        callParamFetch,
      );
      expect(error).toEqual(new HancockError(hancockErrorType.Api, '001', 500, 'testError'));
    }

  });

  it('should call decodeProtocol correctly', async () => {

    (fetch as any).once(JSON.stringify(response.SC_INVOKE_ADAPT_RESPONSE));
    callParamFetch.body = JSON.stringify({ code: 'testCode' });

    const checkStatusSpy = checkStatusMock
      .mockImplementation((res) => Promise.resolve(res.json()));

    const result = await client.decodeProtocol('testCode');

    expect(fetch).toHaveBeenCalledWith(
      'genericHost:1genericBase/mockDecode',
      callParamFetch,
    );
    expect(checkStatusSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(response.SC_INVOKE_ADAPT_RESPONSE);

  });

  it('should call decodeProtocol and throw error', async () => {

    (fetch as any).mockRejectOnce(JSON.stringify(response.ERROR));
    callParamFetch.body = JSON.stringify({ code: 'testCode' });

    const checkStatusSpy = errorHandlerMock
      .mockImplementation(() => { throw new HancockError(hancockErrorType.Api, '001', 500, 'testError'); });

    try {
      await client.decodeProtocol('testCode');
      fail('it should fail');
    } catch (error) {
      expect(fetch).toHaveBeenCalledWith(
        'genericHost:1genericBase/mockDecode',
        callParamFetch,
      );
      expect(error).toEqual(new HancockError(hancockErrorType.Api, '001', 500, 'testError'));
    }

  });

});
