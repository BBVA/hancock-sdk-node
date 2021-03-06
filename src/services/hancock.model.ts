import {BigNumber} from 'bignumber.js';
import EventEmitter from 'eventemitter3';
import {EthereumAddress, IHancockSocketCurrency} from './ethereum/model';
import {HancockEthereumSocket} from './ethereum/socket';

export type DltAddress = string;
export type DltRawTransaction = any;
export type DltSignedTransaction = string;

export interface DltWallet {
  privateKey: string;
  publicKey: string;
  address: string;
}

export type HancockSignerFn = (rawTx: DltRawTransaction, privateKey: string) => DltSignedTransaction;

// API

export interface HancockGenericResponse {
  result: {
    code: number;
    description: string;
  };
}

/** @hidden */
export interface HancockDeployRequest {
  urlBase: string;
  method: string;
  params: string[];
  from: string;
}

/** @hidden */
export interface HancockInvokeRequest {
  method: string;
  from: string;
  params: string[];
  action?: HancockInvokeAction;
}

/** @hidden */
export interface HancockAdaptInvokeRequest extends HancockInvokeRequest {
  action: 'send';
}

/** @hidden */
export interface HancockCallRequest extends HancockInvokeRequest {
  action: 'call';
}

/** @hidden */
export interface HancockAdaptInvokeAbiRequest extends HancockInvokeRequest {
  abi: any;
  to: string;
}

export interface HancockAdaptInvokeResponse extends HancockGenericResponse {
  data: DltRawTransaction;
}

export interface HancockAdaptDeployResponse extends HancockGenericResponse {
  data: DltRawTransaction;
}

export interface HancockCallResponse extends HancockGenericResponse {
  data: any;
}

export interface HancockTxResponse {
  success: boolean;
  transactionHash?: string;
}

// Send to sign

/** @hidden */
export interface HancockSignRequest {
  rawTx: any;
  provider: string;
  backUrl?: string;
}

export interface HancockSignResponse extends HancockTxResponse {
  success: boolean;
}

// Send Tx

/** @hidden */
export interface HancockSendTxRequest {
  tx: DltRawTransaction;
}

export interface HancockSendTxResponse extends HancockTxResponse {
  success: boolean;
  transactionHash: string;
}

// Send signedTx

/** @hidden */
export interface HancockSendSignedTxRequest {
  tx: DltSignedTransaction;
}

export interface HancockSendSignedTxResponse extends HancockTxResponse {
  success: boolean;
  transactionHash: string;
}

// Register

/** @hidden */
export interface HancockRegisterRequest {
  alias: string;
  address: DltAddress;
  abi: any;
}

// Retrieve

/** @hidden */
export interface HancockContractInstance {
  alias: string;
  address: DltAddress;
  abiName: string;
}

/** @hidden */
export interface HancockTokenInstance {
  alias: string;
  address: DltAddress;
  abiName: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
}

// tslint:disable-next-line:no-empty-interface
export interface HancockRegisterResponse extends HancockGenericResponse {
}

// Transfer

/** @hidden */
export interface HancockTransferRequest {
  from: string;
  to: string;
  value: string;
  data?: string;
}

// TokenTransfer

/** @hidden */
export interface HancockTokenTransferRequest {
  from: string;
  to: string;
  value: string;
}

// tslint:disable-next-line:no-empty-interface
export interface HancockTokenTransferResponse extends HancockGenericResponse {
}

// TokenTransferFrom

/** @hidden */
export interface HancockTokenTransferFromRequest {
  from: string;
  sender: string;
  to: string;
  value: string;
}

// tslint:disable-next-line:no-empty-interface
export interface HancockTokenTransferFromResponse extends HancockGenericResponse {
}

// TokenAllowance

/** @hidden */
export interface HancockTokenAllowanceRequest {
  from: string;
  tokenOwner: string;
  spender: string;
}

export interface HancockTokenAllowanceResponse {
  data: number;
}

// Token Register

/** @hidden */
export interface HancockTokenRegisterRequest {
  alias: string;
  address: DltAddress;
}

// tslint:disable-next-line:no-empty-interface
export interface HancockTokenRegisterResponse extends HancockGenericResponse {
}

// Token metadata

export interface HancockTokenMetadataResponse {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
}

// Token approve

/** @hidden */
export interface HancockTokenApproveRequest {
  from: string;
  spender: string;
  value: string;
}

// CONFIG

export interface HancockServiceBaseConfig {
  /** The hostname where the server is accessible */
  host?: string;
  /** The port where the server is listening */
  port?: number;
  /**
   * A base endpoint of the api
   * @default /
   */
  base?: string;
}

export type HancockAdapterConfig = HancockServiceBaseConfig;
export type HancockWalletHubConfig = HancockServiceBaseConfig;
export type HancockBrokerConfig = HancockServiceBaseConfig;

export interface HancockConfig {
  /** Hancock's adapter service configuration */
  adapter?: HancockAdapterConfig;
  /** Hancock's wallet service configuration */
  wallet?: HancockWalletHubConfig;
  /** Hancock's broker service configuration */
  broker?: HancockBrokerConfig;
}

/** @hidden */
export interface InitialHancockServiceBaseConfig {
  host: string;
  port: number;
  base: string;
  resources: any;
}

/** @ignored */
export type InitialHancockAdapterConfig = InitialHancockServiceBaseConfig;
/** @ignored */
export type InitialHancockWalletHubConfig = InitialHancockServiceBaseConfig;
/** @ignored */
export type InitialHancockBrokerConfig = InitialHancockServiceBaseConfig;

/** @ignored */
export interface InitialHancockConfig {
  adapter: InitialHancockAdapterConfig;
  wallet: InitialHancockWalletHubConfig;
  broker: InitialHancockBrokerConfig;
}

// PROTOCOL

export type HancockProtocolAction = 'transfer';
export type HancockProtocolDlt = 'ethereum';

export interface HancockProtocolEncodeBody {
  value: string;
  to: string;
  data: string;
}

export interface HancockProtocolEncode {
  action: HancockProtocolAction;
  body: HancockProtocolEncodeBody;
  dlt: HancockProtocolDlt;
}

export interface HancockProtocolEncodeResponse extends HancockGenericResponse {
  data: {
    qrEncode: string;
  };
}

/** @hidden */
export interface HancockProtocolDecodeRequest {
  code: string;
}

export interface HancockTokenBalanceResponse {
  balance: BigNumber;
  decimals: number;
}

export interface HancockProtocolDecodeResponse extends HancockGenericResponse {
  data: HancockProtocolEncode;
}

// ERROR

/** @hidden */
export interface IHancockError extends Error {
  internalError: string;
  error: number;
  message: string;
  extendedMessage: string;
}

// INTERFACES

export type HancockEventKind = 'error' | 'event' | 'logs' | 'tx';
export type HancockEventBody = HancockContractEventBody | HancockTransactionEventBody;

export interface HancockContractEventBody {
  blockNumber: number;
  blockHash: string;
  transactionId: string;
  eventName: string;
  returnValues: string[];
  fee: IHancockSocketCurrency;
  timestamp: number;
}

export interface HancockTransactionEventBody {
  blockHash: string;
  blockNumber: number;
  transactionId: string;
  from: string;
  to: string;
  value: IHancockSocketCurrency;
  data: string;
  fee: IHancockSocketCurrency;
  newContractAddress?: string;
  timestamp: number;
}

export interface HancockEvent {
  kind: HancockEventKind;
  body: HancockEventBody;
  raw: any;
}

export interface HancockEventEmitter extends EventEmitter {
  on(event: HancockEventKind, fn: (payload: HancockEvent) => void, context?: any): this;
}

/** @hidden */
export interface HancockClient {
  transaction: {
    send(tx: any): Promise<HancockSendTxResponse>;
    sendSigned(tx: any): Promise<HancockSendSignedTxResponse>;
    sendToSignProvider(rawTx: any, provider: string, callback?: HancockCallBackOptions): Promise<HancockSignResponse>;
    sign(rawTx: DltRawTransaction, privateKey: string): string;
    subscribe(addresses: string[]): HancockEthereumSocket;
  };
  transfer: {
    send(from: string, to: string, value: string, options?: HancockInvokeOptions, data?: string): Promise<HancockSignResponse>;
    subscribe(addresses: string[]): HancockEthereumSocket;
  };
  protocol: {
    encode(action: HancockProtocolAction, dlt: HancockProtocolDlt, value: string, to: string, data: string): Promise<HancockProtocolEncodeResponse>;
    decode(code: string): Promise<HancockProtocolDecodeResponse>;
  };
  smartContract?: {
    deploy(from: EthereumAddress, options: HancockInvokeOptions, urlBase: string, constructorName: string, constructorParams: string[], alias?: string)
      : Promise<HancockTransactionEventBody | undefined>;
    invoke(contractAddress: string, method: string, params: string[], from: string, options?: HancockInvokeOptions): Promise<HancockSignResponse>;
    invokeAbi(contractAddressOrAlias: string, method: string, params: string[], from: string, options: HancockInvokeOptions, abi: any)
      : Promise<HancockSignResponse>;
    call(contractAddress: string, method: string, params: string[], from: string): Promise<HancockCallResponse>;
    callAbi(contractAddressOrAlias: string, method: string, params: string[], from: string, options: HancockInvokeOptions, abi: any)
      : Promise<HancockCallResponse>;
    subscribeToEvents(contracts: string[]): HancockEthereumSocket;
    subscribeToTransactions(contracts: string[]): HancockEthereumSocket;
  };
  token?: {
    getBalance(addressOrAlias: string, address: string): Promise<HancockTokenBalanceResponse>;
    getMetadata(addressOrAlias: string): Promise<HancockTokenMetadataResponse>;
    transfer(from: string, to: string, value: string, addressOrAlias: string, options?: HancockInvokeOptions): Promise<HancockSignResponse>;
    // tslint:disable-next-line:max-line-length
    transferFrom(from: string, sender: string, to: string, value: string, addressOrAlias: string, options?: HancockInvokeOptions): Promise<HancockSignResponse>;
    register(alias: string, address: DltAddress): Promise<HancockTokenRegisterResponse>;
    approve(from: string, spender: string, value: string, addressOrAlias: string, options?: HancockInvokeOptions): Promise<HancockSignResponse>;
    allowance(from: string, tokenOwner: string, spender: string, addressOrAlias: string): Promise<HancockTokenAllowanceResponse>;
  };
  wallet: {
    getBalance(address: string): Promise<BigNumber>;
    generate(): DltWallet;
  };
}

export type HancockInvokeAction = 'send' | 'call';

export interface HancockInvokeOptions {
  /** The private key with which the raw transaction will be signed */
  privateKey?: string;
  /** The sign provider alias which will receive the raw transaction */
  signProvider?: string;
  /** Callback url to be notified once the transaction will be sent */
  callback?: HancockCallBackOptions;
  /** Determine if the request is synchronous or asynchronous */
  async?: boolean;
}

export interface HancockCallBackOptions {
  backUrl?: string;
  requestId?: string;
}

export enum SOCKET_EVENT_KINDS {
  WatchTransfer = 'watch-transfers',
  WatchTransaction = 'watch-transactions',
  WatchSmartContractTransaction = 'watch-contracts-transactions',
  WatchSmartContractDeployment = 'watch-contracts-deployments',
  WatchSmartContractEvent = 'watch-contracts-events',
  UnwatchTransfer = 'unwatch-transfers',
  UnwatchTransaction = 'unwatch-transactions',
  UnwatchSmartContractTransaction = 'unwatch-contracts-transactions',
  UnwatchSmartContractDeployment = 'unwatch-contracts-deployments',
  UnwatchSmartContractEvent = 'unwatch-contracts-events',
}

export enum CONSUMER_EVENT_KINDS {
  Transfer = 'transfer',
  Transaction = 'transaction',
  SmartContractTransaction = 'contract-transaction',
  SmartContractDeployment = 'contract-deployment',
  SmartContractEvent = 'contract-event',
  Error = 'error',
}

export type HancockSocketStatus = 'pending' | 'mined';
export type HancockSocketBody = any;

export interface HancockSocketMessage {
  kind: SOCKET_EVENT_KINDS;
  body: HancockSocketBody;
  status?: HancockSocketStatus;
  consumer?: string;
}
