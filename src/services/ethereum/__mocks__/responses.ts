export const RAW_TX = {
  from: '0xde8e772f0350e992ddef81bf8f51d94a8ea9216d',
  data: '0xa9059cbb0000000000000000000000006c0a14f7561898b9ddc0c57652a53b2c6665443e0000000000000000000000000000000000000000000000000000000000000001',
  gasPrice: '0x4A817C800',
  gas: '0xc7c5',
  to: '0xe3aee62f5bb4abab8b614fd80f1d92dbdbfd2f9a',
  nonce: '0x3a',
};

export const SC_INVOKE_ADAPT_RESPONSE = {
  result: {
    code: 200,
    description: 'Smart Contract - Success',
  },
  data: RAW_TX,
};

export const PRIVATE_KEY: string = '0x4dc34569751ddb28166ff21eb5b8ad2f070d9cb205a28d142da13c8996368c75';

// tslint:disable-next-line:max-line-length
export const SIGNED_TX: string = '0xf8a93a8504a817c80082c7c594e3aee62f5bb4abab8b614fd80f1d92dbdbfd2f9a80b844a9059cbb0000000000000000000000006c0a14f7561898b9ddc0c57652a53b2c6665443e00000000000000000000000000000000000000000000000000000000000000011ba0352fed557e3225e363e804264a4fd97ac5e450dad2d8352b80baa105272bd752a03a4656f228b3f3163c72b59776add6867808b834668140dd2233f2350724b318';

export const SEND_SIGNED_TX_RESPONSE = {
  success: true,
  txReceipt: {
    transactionHash: '0xf755817d04cc2ec7869eb5727845d98f27f2a6c8a2911840f3867f3462a10267',
    transactionIndex: 0,
    blockHash: '0x77bfc482647755c539df5b11adc2c26505ac5db6b91241fcd94a2dd70cff9c89',
    blockNumber: 133330,
    gasUsed: 51141,
    cumulativeGasUsed: 51141,
    contractAddress: null,
    logs: [],
    status: true,
    // tslint:disable-next-line:max-line-length
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000010000000000000000040000000000000000000000000000000000200000000000000000000000000000020000000000000000000000000200000000000000000000000200000000002004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000001000000000',
  },
};

export const SEND_TX_RESPONSE = SEND_SIGNED_TX_RESPONSE;

export const SEND_TO_SIGN_RESPONSE = {
  success: true,
};

export const SC_CALL_RESPONSE = {
  result: {
    code: 200,
    description: 'Smart Contract - Success',
  },
  data: {},
};

export const GET_BALANCE_RESPONSE = {
  result: {
    code: 202,
    description: 'Ethereum - Operation successfully requested',
  },
  data: {
    balance: '10000',
  },
};

export const GET_BALANCE_ERROR_RESPONSE = {
  result: {
    code: 500,
    description: 'Ethereum - Blockchain request error',
  },
};

export const GET_TOKEN_BALANCE_RESPONSE = {
  result: {
    code: 202,
    description: 'Ethereum Token - Operation successfully requested',
  },
  data: {
    balance: 10000,
    decimals: 18,
  },
};

export const GET_TOKEN_BALANCE_ERROR_RESPONSE = {
  result: {
    code: 500,
    description: 'Ethereum Token - Blockchain request error',
  },
};

export const GET_TOKEN_ALLOWANCE_RESPONSE = {
  result: {
    code: 200,
    description: 'Token Allowance - Success',
  },
  data: '0',
};

export const GET_TOKEN_METADATA_RESPONSE = {
  result: {
    code: 200,
    description: 'Ethereum Token - Operation successfully requested',
  },
  data: {
    name: 'mockedName',
    symbol: 'mockedSymbol',
    decimals: 18,
    totalSupply: 100000,
  },
};

export const GET_TOKEN_METADATA_ERROR_RESPONSE = {
  result: {
    code: 500,
    description: 'Ethereum Metadata Token - Blockchain request error',
  },
};

export const GET_ALL_TOKENS_RESPONSE = {
  result: {
    code: 200,
    description: 'Ethereum Token - Operation successfully requested',
  },
  data: [{
    address: 'mockedAddress',
    alias: 'mockedAlias',
    abiName: 'erc20',
  }],
};

export const GET_ALL_TOKENS_ERROR_RESPONSE = {
  result: {
    code: 500,
    description: 'Ethereum Token - Blockchain request error',
  },
};

export const COMMON_RESPONSE_ERROR = {
  code_internal: 'DC4000',
  code_http: 400,
  message: 'Bad request',
};

// tslint:disable-next-line:max-line-length
export const SC_INVOKE_SIGNED_TX: string = '0xf8a93a8504a817c80082c7c594e3aee62f5bb4abab8b614fd80f1d92dbdbfd2f9a80b844a9059cbb0000000000000000000000006c0a14f7561898b9ddc0c57652a53b2c6665443e00000000000000000000000000000000000000000000000000000000000000011ba0352fed557e3225e363e804264a4fd97ac5e450dad2d8352b80baa105272bd752a03a4656f228b3f3163c72b59776add6867808b834668140dd2233f2350724b318';

export const ERROR: any = {
  body: {
    code_internal: 'DC4040',
    code_http: 404,
    message: 'Not Found',
  },
};
