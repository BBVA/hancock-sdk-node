import 'jest';

import * as ws from 'isomorphic-ws';
import { HancockSocketMessage, SOCKET_EVENT_KINDS } from '../..';
import { HancockEthereumSocket } from '../socket';

jest.mock('isomorphic-ws');

describe('HancockEthereumSocket integration tests', () => {

  let ethereumSocketInstance: HancockEthereumSocket;
  const url: string = 'mockedUrl';
  const consumer: string = 'mockedConsumer';

  const socket: jest.Mock = (ws as any).__WebSocketConstructor__;
  const socketInstance: any = (ws as any).__WebSocketInstance__;

  beforeAll(() => {

    ethereumSocketInstance = new HancockEthereumSocket(url, consumer);

  });

  beforeEach(() => {

    jest.clearAllMocks();

  });

  it('should instanciate successfully with the given params', () => {

    const socketOn: jest.Mock = socketInstance.on;

    const instance = new HancockEthereumSocket(url, consumer);

    expect(instance instanceof HancockEthereumSocket).toBeTruthy();
    expect(socket).toHaveBeenCalledWith(url);
    expect(socketOn).toHaveBeenCalledTimes(3);

  });

  describe('::closeSocket', () => {

    it('should close the websocket connection', async () => {

      const socketClose: jest.Mock = socketInstance.close;

      ethereumSocketInstance.closeSocket();

      expect(socketClose).toHaveBeenCalled();

    });

  });

  describe('::watchTransfer', () => {

    const addresses: string[] = ['0xf01b3c2131fb5bd8d1d1e5d44f8ad14a2728ec91', '0x187ace2d9051d74296a8e4e154d652b8b6ec4738'];
    const socketSend: jest.Mock = socketInstance.send;

    it('should sent the given list of addresses to the transfers watch list of broker service', async () => {

      const expectedMessage: HancockSocketMessage = {
        kind: SOCKET_EVENT_KINDS.WatchTransfer,
        body: addresses,
        consumer,
        status: 'mined',
      };

      ethereumSocketInstance.watchTransfer(addresses);

      expect(socketSend).toHaveBeenCalledWith(JSON.stringify(expectedMessage));

    });

    it('should do nothing if the given list of addresses is empty', async () => {

      const addrs: string[] = [];

      ethereumSocketInstance.watchTransfer(addrs);

      expect(socketSend).not.toHaveBeenCalled();

    });

    it('should do nothing if the connection is not ready', async () => {

      socketInstance.readyState = -1;

      ethereumSocketInstance.watchTransfer(addresses);

      expect(socketSend).not.toHaveBeenCalled();

      socketInstance.readyState = (socket as any).OPEN;

    });

  });

  describe('::watchTransaction', () => {

    const addresses: string[] = ['0xf01b3c2131fb5bd8d1d1e5d44f8ad14a2728ec91', '0x187ace2d9051d74296a8e4e154d652b8b6ec4738'];
    const socketSend: jest.Mock = socketInstance.send;

    it('should sent the given list of addresses to the transfers watch list of broker service', async () => {

      const expectedMessage: HancockSocketMessage = {
        kind: SOCKET_EVENT_KINDS.WatchTransaction,
        body: addresses,
        consumer,
        status: 'mined',
      };

      ethereumSocketInstance.watchTransaction(addresses);

      expect(socketSend).toHaveBeenCalledWith(JSON.stringify(expectedMessage));

    });

    it('should do nothing if the given list of addresses is empty', async () => {

      const addrs: string[] = [];

      ethereumSocketInstance.watchTransaction(addrs);

      expect(socketSend).not.toHaveBeenCalled();

    });

    it('should do nothing if the connection is not ready', async () => {

      socketInstance.readyState = -1;

      ethereumSocketInstance.watchTransaction(addresses);

      expect(socketSend).not.toHaveBeenCalled();

      socketInstance.readyState = (socket as any).OPEN;

    });

  });

  describe('::watchContractEvent', () => {

    const addressesOrAliases: string[] = ['mockedAlias', '0x187ace2d9051d74296a8e4e154d652b8b6ec4738'];
    const socketSend: jest.Mock = socketInstance.send;

    it('should sent the given list of addresses or aliases to the contract events watch list of broker service', async () => {

      const expectedMessage: HancockSocketMessage = {
        kind: SOCKET_EVENT_KINDS.WatchSmartContractEvent,
        body: addressesOrAliases,
        consumer,
        status: 'mined',
      };

      ethereumSocketInstance.watchContractEvent(addressesOrAliases);

      expect(socketSend).toHaveBeenCalledWith(JSON.stringify(expectedMessage));

    });

    it('should do nothing if the given list of addresses is empty', async () => {

      const addrsOrAliases: string[] = [];

      ethereumSocketInstance.watchContractEvent(addrsOrAliases);

      expect(socketSend).not.toHaveBeenCalled();

    });

    it('should do nothing if the connection is not ready', async () => {

      socketInstance.readyState = -1;

      ethereumSocketInstance.watchContractEvent(addressesOrAliases);

      expect(socketSend).not.toHaveBeenCalled();

      socketInstance.readyState = (socket as any).OPEN;

    });

  });

  describe('::watchContractTransaction', () => {

    const addressesOrAliases: string[] = ['mockedAlias', '0x187ace2d9051d74296a8e4e154d652b8b6ec4738'];
    const socketSend: jest.Mock = socketInstance.send;

    it('should sent the given list of addresses or aliases to the contract transaction watch list of broker service', async () => {

      const expectedMessage: HancockSocketMessage = {
        kind: SOCKET_EVENT_KINDS.WatchSmartContractTransaction,
        body: addressesOrAliases,
        consumer,
        status: 'mined',
      };

      ethereumSocketInstance.watchContractTransaction(addressesOrAliases);

      expect(socketSend).toHaveBeenCalledWith(JSON.stringify(expectedMessage));

    });

    it('should do nothing if the given list of addresses is empty', async () => {

      const addrsOrAliases: string[] = [];

      ethereumSocketInstance.watchContractTransaction(addrsOrAliases);

      expect(socketSend).not.toHaveBeenCalled();

    });

    it('should do nothing if the connection is not ready', async () => {

      socketInstance.readyState = -1;

      ethereumSocketInstance.watchContractTransaction(addressesOrAliases);

      expect(socketSend).not.toHaveBeenCalled();

      socketInstance.readyState = (socket as any).OPEN;

    });

  });

  describe('::unwatchTransfer', () => {

    const addresses: string[] = ['0xf01b3c2131fb5bd8d1d1e5d44f8ad14a2728ec91', '0x187ace2d9051d74296a8e4e154d652b8b6ec4738'];
    const socketSend: jest.Mock = socketInstance.send;

    it('should sent the given list of addresses to the transfers watch list of broker service', async () => {

      const expectedMessage: HancockSocketMessage = {
        kind: SOCKET_EVENT_KINDS.UnwatchTransfer,
        body: addresses,
        consumer,
        status: 'mined',
      };

      ethereumSocketInstance.unwatchTransfer(addresses);

      expect(socketSend).toHaveBeenCalledWith(JSON.stringify(expectedMessage));

    });

    it('should do nothing if the given list of addresses is empty', async () => {

      const addrs: string[] = [];

      ethereumSocketInstance.unwatchTransfer(addrs);

      expect(socketSend).not.toHaveBeenCalled();

    });

    it('should do nothing if the connection is not ready', async () => {

      socketInstance.readyState = -1;

      ethereumSocketInstance.unwatchTransfer(addresses);

      expect(socketSend).not.toHaveBeenCalled();

      socketInstance.readyState = (socket as any).OPEN;

    });

  });

  describe('::unwatchTransaction', () => {

    const addresses: string[] = ['0xf01b3c2131fb5bd8d1d1e5d44f8ad14a2728ec91', '0x187ace2d9051d74296a8e4e154d652b8b6ec4738'];
    const socketSend: jest.Mock = socketInstance.send;

    it('should sent the given list of addresses to the transfers watch list of broker service', async () => {

      const expectedMessage: HancockSocketMessage = {
        kind: SOCKET_EVENT_KINDS.UnwatchTransaction,
        body: addresses,
        consumer,
        status: 'mined',
      };

      ethereumSocketInstance.unwatchTransaction(addresses);

      expect(socketSend).toHaveBeenCalledWith(JSON.stringify(expectedMessage));

    });

    it('should do nothing if the given list of addresses is empty', async () => {

      const addrs: string[] = [];

      ethereumSocketInstance.unwatchTransaction(addrs);

      expect(socketSend).not.toHaveBeenCalled();

    });

    it('should do nothing if the connection is not ready', async () => {

      socketInstance.readyState = -1;

      ethereumSocketInstance.unwatchTransaction(addresses);

      expect(socketSend).not.toHaveBeenCalled();

      socketInstance.readyState = (socket as any).OPEN;

    });

  });

  describe('::unwatchContractEvent', () => {

    const addressesOrAliases: string[] = ['mockedAlias', '0x187ace2d9051d74296a8e4e154d652b8b6ec4738'];
    const socketSend: jest.Mock = socketInstance.send;

    it('should sent the given list of addresses or aliases to the contract events watch list of broker service', async () => {

      const expectedMessage: HancockSocketMessage = {
        kind: SOCKET_EVENT_KINDS.UnwatchSmartContractEvent,
        body: addressesOrAliases,
        consumer,
        status: 'mined',
      };

      ethereumSocketInstance.unwatchContractEvent(addressesOrAliases);

      expect(socketSend).toHaveBeenCalledWith(JSON.stringify(expectedMessage));

    });

    it('should do nothing if the given list of addresses is empty', async () => {

      const addrsOrAliases: string[] = [];

      ethereumSocketInstance.unwatchContractEvent(addrsOrAliases);

      expect(socketSend).not.toHaveBeenCalled();

    });

    it('should do nothing if the connection is not ready', async () => {

      socketInstance.readyState = -1;

      ethereumSocketInstance.unwatchContractEvent(addressesOrAliases);

      expect(socketSend).not.toHaveBeenCalled();

      socketInstance.readyState = (socket as any).OPEN;

    });

  });

  describe('::unwatchContractTransaction', () => {

    const addressesOrAliases: string[] = ['mockedAlias', '0x187ace2d9051d74296a8e4e154d652b8b6ec4738'];
    const socketSend: jest.Mock = socketInstance.send;

    it('should sent the given list of addresses or aliases to the contract events watch list of broker service', async () => {

      const expectedMessage: HancockSocketMessage = {
        kind: SOCKET_EVENT_KINDS.UnwatchSmartContractTransaction,
        body: addressesOrAliases,
        consumer,
        status: 'mined',
      };

      ethereumSocketInstance.unwatchContractTransaction(addressesOrAliases);

      expect(socketSend).toHaveBeenCalledWith(JSON.stringify(expectedMessage));

    });

    it('should do nothing if the given list of addresses is empty', async () => {

      const addrsOrAliases: string[] = [];

      ethereumSocketInstance.unwatchContractTransaction(addrsOrAliases);

      expect(socketSend).not.toHaveBeenCalled();

    });

    it('should do nothing if the connection is not ready', async () => {

      socketInstance.readyState = -1;

      ethereumSocketInstance.unwatchContractTransaction(addressesOrAliases);

      expect(socketSend).not.toHaveBeenCalled();

      socketInstance.readyState = (socket as any).OPEN;

    });

  });

  describe('::eventHandlers', () => {

    beforeEach(() => {

      socketInstance._clear();
      ethereumSocketInstance = new HancockEthereumSocket(url, consumer);

    });

    it('should emit "opened" when the connection is opened', () => {

      const spy = jest.fn();

      ethereumSocketInstance.on('opened', spy);

      socketInstance._trigger('open');

      expect(spy).toHaveBeenCalled();

    });

    it('should emit "error" when an error comes from broker service', () => {

      const spy = jest.fn();
      const e: Error = new Error('Boom!');

      ethereumSocketInstance.on('error', spy);

      socketInstance._trigger('error', e);

      expect(spy).toHaveBeenCalledWith(e);

    });

    it('should emit "message" when a message comes from broker service', () => {

      const spy = jest.fn();
      const message: any = { kind: 'mockedKind', whatever: 'whatever' };

      ethereumSocketInstance.on(message.kind, spy);

      socketInstance._trigger('message', JSON.stringify(message));

      expect(spy).toHaveBeenCalledWith(message);

    });

    it('should emit "message" when a message comes from broker service (with data)', () => {

      const spy = jest.fn();
      const message: any = { data: { kind: 'mockedKind', whatever: 'whatever' } };

      ethereumSocketInstance.on(message.kind, spy);

      socketInstance._trigger('message', JSON.stringify(message));

      expect(spy).toHaveBeenCalledWith(message);

    });

  });

});
