import { 
  Cell,
  Slice, 
  Address, 
  Builder, 
  beginCell, 
  ComputeError, 
  TupleItem, 
  TupleReader, 
  Dictionary, 
  contractAddress, 
  ContractProvider, 
  Sender, 
  Contract, 
  ContractABI, 
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue
} from '@ton/core';

export type StateInit = {
  $$type: 'StateInit';
  code: Cell;
  data: Cell;
}

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeRef(src.code);
      b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
      },
      parse: (src) => {
          return loadStateInit(src.loadRef().beginParse());
      }
  }
}

export type StdAddress = {
  $$type: 'StdAddress';
  workchain: bigint;
  address: bigint;
}

export function storeStdAddress(src: StdAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.workchain, 8);
      b_0.storeUint(src.address, 256);
  };
}

export function loadStdAddress(slice: Slice) {
  let sc_0 = slice;
  let _workchain = sc_0.loadIntBig(8);
  let _address = sc_0.loadUintBig(256);
  return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readBigNumber();
  return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readBigNumber();
  return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.workchain);
  builder.writeNumber(source.address);
  return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
      },
      parse: (src) => {
          return loadStdAddress(src.loadRef().beginParse());
      }
  }
}

export type VarAddress = {
  $$type: 'VarAddress';
  workchain: bigint;
  address: Slice;
}

export function storeVarAddress(src: VarAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeInt(src.workchain, 32);
      b_0.storeRef(src.address.asCell());
  };
}

export function loadVarAddress(slice: Slice) {
  let sc_0 = slice;
  let _workchain = sc_0.loadIntBig(32);
  let _address = sc_0.loadRef().asSlice();
  return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readCell().asSlice();
  return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readCell().asSlice();
  return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.workchain);
  builder.writeSlice(source.address.asCell());
  return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
      },
      parse: (src) => {
          return loadVarAddress(src.loadRef().beginParse());
      }
  }
}

export type Context = {
  $$type: 'Context';
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Slice;
}

export function storeContext(src: Context) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeBit(src.bounced);
      b_0.storeAddress(src.sender);
      b_0.storeInt(src.value, 257);
      b_0.storeRef(src.raw.asCell());
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef().asSlice();
  return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell().asSlice();
  return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell().asSlice();
  return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw.asCell());
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeContext(src)).endCell());
      },
      parse: (src) => {
          return loadContext(src.loadRef().beginParse());
      }
  }
}

export type SendParameters = {
  $$type: 'SendParameters';
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeBit(src.bounce);
      b_0.storeAddress(src.to);
      b_0.storeInt(src.value, 257);
      b_0.storeInt(src.mode, 257);
      if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
      if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
      if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
      },
      parse: (src) => {
          return loadSendParameters(src.loadRef().beginParse());
      }
  }
}

export type ChangeOwner = {
  $$type: 'ChangeOwner';
  query_id: bigint;
  newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3698892769, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3698892769) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return { $$type: 'ChangeOwner' as const, query_id: _query_id, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _newOwner = source.readAddress();
  return { $$type: 'ChangeOwner' as const, query_id: _query_id, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _newOwner = source.readAddress();
  return { $$type: 'ChangeOwner' as const, query_id: _query_id, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
      },
      parse: (src) => {
          return loadChangeOwner(src.loadRef().beginParse());
      }
  }
}

export type ChangeOwnerOk = {
  $$type: 'ChangeOwnerOk';
  query_id: bigint;
  newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(4125133755, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4125133755) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return { $$type: 'ChangeOwnerOk' as const, query_id: _query_id, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _newOwner = source.readAddress();
  return { $$type: 'ChangeOwnerOk' as const, query_id: _query_id, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _newOwner = source.readAddress();
  return { $$type: 'ChangeOwnerOk' as const, query_id: _query_id, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
      },
      parse: (src) => {
          return loadChangeOwnerOk(src.loadRef().beginParse());
      }
  }
}

export type Deploy = {
  $$type: 'Deploy';
  query_id: bigint;
}

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2750821052, 32);
      b_0.storeUint(src.query_id, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2750821052) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: 'Deploy' as const, query_id: _query_id };
}

function loadTupleDeploy(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'Deploy' as const, query_id: _query_id };
}

function loadGetterTupleDeploy(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'Deploy' as const, query_id: _query_id };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
      },
      parse: (src) => {
          return loadDeploy(src.loadRef().beginParse());
      }
  }
}

export type DeployOk = {
  $$type: 'DeployOk';
  query_id: bigint;
}

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(810250248, 32);
      b_0.storeUint(src.query_id, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 810250248) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: 'DeployOk' as const, query_id: _query_id };
}

function loadTupleDeployOk(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'DeployOk' as const, query_id: _query_id };
}

function loadGetterTupleDeployOk(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'DeployOk' as const, query_id: _query_id };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
      },
      parse: (src) => {
          return loadDeployOk(src.loadRef().beginParse());
      }
  }
}

export type FactoryDeploy = {
  $$type: 'FactoryDeploy';
  query_id: bigint;
  cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(4028379533, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4028379533) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return { $$type: 'FactoryDeploy' as const, query_id: _query_id, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _cashback = source.readAddress();
  return { $$type: 'FactoryDeploy' as const, query_id: _query_id, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _cashback = source.readAddress();
  return { $$type: 'FactoryDeploy' as const, query_id: _query_id, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
      },
      parse: (src) => {
          return loadFactoryDeploy(src.loadRef().beginParse());
      }
  }
}

export type JettonTransfer = {
  $$type: 'JettonTransfer';
  query_id: bigint;
  amount: bigint;
  destination: Address;
  response_destination: Address;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell | null;
}

export function storeJettonTransfer(src: JettonTransfer) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(260734629, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.destination);
      b_0.storeAddress(src.response_destination);
      if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
      b_0.storeCoins(src.forward_ton_amount);
      if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
  };
}

export function loadJettonTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _destination = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _destination = source.readAddress();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCellOpt();
  return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleJettonTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _destination = source.readAddress();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCellOpt();
  return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.destination);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeCell(source.forward_payload);
  return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
      },
      parse: (src) => {
          return loadJettonTransfer(src.loadRef().beginParse());
      }
  }
}

export type JettonTransferNotification = {
  $$type: 'JettonTransferNotification';
  query_id: bigint;
  amount: bigint;
  sender: Address;
  forward_payload: Cell | null;
}

export function storeJettonTransferNotification(src: JettonTransferNotification) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(1935855772, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
      b_0.storeAddress(src.sender);
      if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
  };
}

export function loadJettonTransferNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _sender = sc_0.loadAddress();
  let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _sender = source.readAddress();
  let _forward_payload = source.readCellOpt();
  return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadGetterTupleJettonTransferNotification(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _sender = source.readAddress();
  let _forward_payload = source.readCellOpt();
  return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleJettonTransferNotification(source: JettonTransferNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.sender);
  builder.writeCell(source.forward_payload);
  return builder.build();
}

function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeJettonTransferNotification(src)).endCell());
      },
      parse: (src) => {
          return loadJettonTransferNotification(src.loadRef().beginParse());
      }
  }
}

export type Excesses = {
  $$type: 'Excesses';
  query_id: bigint;
}

export function storeExcesses(src: Excesses) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3576854235, 32);
      b_0.storeUint(src.query_id, 64);
  };
}

export function loadExcesses(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadGetterTupleExcesses(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
      },
      parse: (src) => {
          return loadExcesses(src.loadRef().beginParse());
      }
  }
}

export type WithdrawJetton = {
  $$type: 'WithdrawJetton';
  query_id: bigint;
  amount: bigint;
}

export function storeWithdrawJetton(src: WithdrawJetton) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(4093698073, 32);
      b_0.storeUint(src.query_id, 64);
      b_0.storeCoins(src.amount);
  };
}

export function loadWithdrawJetton(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4093698073) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  return { $$type: 'WithdrawJetton' as const, query_id: _query_id, amount: _amount };
}

function loadTupleWithdrawJetton(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  return { $$type: 'WithdrawJetton' as const, query_id: _query_id, amount: _amount };
}

function loadGetterTupleWithdrawJetton(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  return { $$type: 'WithdrawJetton' as const, query_id: _query_id, amount: _amount };
}

function storeTupleWithdrawJetton(source: WithdrawJetton) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserWithdrawJetton(): DictionaryValue<WithdrawJetton> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeWithdrawJetton(src)).endCell());
      },
      parse: (src) => {
          return loadWithdrawJetton(src.loadRef().beginParse());
      }
  }
}

export type WithdrawTon = {
  $$type: 'WithdrawTon';
  query_id: bigint;
}

export function storeWithdrawTon(src: WithdrawTon) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2577720208, 32);
      b_0.storeUint(src.query_id, 64);
  };
}

export function loadWithdrawTon(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2577720208) { throw Error('Invalid prefix'); }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: 'WithdrawTon' as const, query_id: _query_id };
}

function loadTupleWithdrawTon(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'WithdrawTon' as const, query_id: _query_id };
}

function loadGetterTupleWithdrawTon(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'WithdrawTon' as const, query_id: _query_id };
}

function storeTupleWithdrawTon(source: WithdrawTon) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserWithdrawTon(): DictionaryValue<WithdrawTon> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeWithdrawTon(src)).endCell());
      },
      parse: (src) => {
          return loadWithdrawTon(src.loadRef().beginParse());
      }
  }
}

export type SetTokenAddress = {
  $$type: 'SetTokenAddress';
  address: Address;
}

export function storeSetTokenAddress(src: SetTokenAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2577186173, 32);
      b_0.storeAddress(src.address);
  };
}

export function loadSetTokenAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2577186173) { throw Error('Invalid prefix'); }
  let _address = sc_0.loadAddress();
  return { $$type: 'SetTokenAddress' as const, address: _address };
}

function loadTupleSetTokenAddress(source: TupleReader) {
  let _address = source.readAddress();
  return { $$type: 'SetTokenAddress' as const, address: _address };
}

function loadGetterTupleSetTokenAddress(source: TupleReader) {
  let _address = source.readAddress();
  return { $$type: 'SetTokenAddress' as const, address: _address };
}

function storeTupleSetTokenAddress(source: SetTokenAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  return builder.build();
}

function dictValueParserSetTokenAddress(): DictionaryValue<SetTokenAddress> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSetTokenAddress(src)).endCell());
      },
      parse: (src) => {
          return loadSetTokenAddress(src.loadRef().beginParse());
      }
  }
}

export type SetTokenWalletAddress = {
  $$type: 'SetTokenWalletAddress';
  address: Address;
}

export function storeSetTokenWalletAddress(src: SetTokenWalletAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2355774250, 32);
      b_0.storeAddress(src.address);
  };
}

export function loadSetTokenWalletAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2355774250) { throw Error('Invalid prefix'); }
  let _address = sc_0.loadAddress();
  return { $$type: 'SetTokenWalletAddress' as const, address: _address };
}

function loadTupleSetTokenWalletAddress(source: TupleReader) {
  let _address = source.readAddress();
  return { $$type: 'SetTokenWalletAddress' as const, address: _address };
}

function loadGetterTupleSetTokenWalletAddress(source: TupleReader) {
  let _address = source.readAddress();
  return { $$type: 'SetTokenWalletAddress' as const, address: _address };
}

function storeTupleSetTokenWalletAddress(source: SetTokenWalletAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  return builder.build();
}

function dictValueParserSetTokenWalletAddress(): DictionaryValue<SetTokenWalletAddress> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSetTokenWalletAddress(src)).endCell());
      },
      parse: (src) => {
          return loadSetTokenWalletAddress(src.loadRef().beginParse());
      }
  }
}

export type SetUsdtWalletAddress = {
  $$type: 'SetUsdtWalletAddress';
  address: Address;
}

export function storeSetUsdtWalletAddress(src: SetUsdtWalletAddress) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(2695699963, 32);
      b_0.storeAddress(src.address);
  };
}

export function loadSetUsdtWalletAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2695699963) { throw Error('Invalid prefix'); }
  let _address = sc_0.loadAddress();
  return { $$type: 'SetUsdtWalletAddress' as const, address: _address };
}

function loadTupleSetUsdtWalletAddress(source: TupleReader) {
  let _address = source.readAddress();
  return { $$type: 'SetUsdtWalletAddress' as const, address: _address };
}

function loadGetterTupleSetUsdtWalletAddress(source: TupleReader) {
  let _address = source.readAddress();
  return { $$type: 'SetUsdtWalletAddress' as const, address: _address };
}

function storeTupleSetUsdtWalletAddress(source: SetUsdtWalletAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  return builder.build();
}

function dictValueParserSetUsdtWalletAddress(): DictionaryValue<SetUsdtWalletAddress> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSetUsdtWalletAddress(src)).endCell());
      },
      parse: (src) => {
          return loadSetUsdtWalletAddress(src.loadRef().beginParse());
      }
  }
}

export type SetTradeFee = {
  $$type: 'SetTradeFee';
  amount: bigint;
}

export function storeSetTradeFee(src: SetTradeFee) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(594311571, 32);
      b_0.storeInt(src.amount, 257);
  };
}

export function loadSetTradeFee(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 594311571) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadIntBig(257);
  return { $$type: 'SetTradeFee' as const, amount: _amount };
}

function loadTupleSetTradeFee(source: TupleReader) {
  let _amount = source.readBigNumber();
  return { $$type: 'SetTradeFee' as const, amount: _amount };
}

function loadGetterTupleSetTradeFee(source: TupleReader) {
  let _amount = source.readBigNumber();
  return { $$type: 'SetTradeFee' as const, amount: _amount };
}

function storeTupleSetTradeFee(source: SetTradeFee) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserSetTradeFee(): DictionaryValue<SetTradeFee> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSetTradeFee(src)).endCell());
      },
      parse: (src) => {
          return loadSetTradeFee(src.loadRef().beginParse());
      }
  }
}

export type SetPrice = {
  $$type: 'SetPrice';
  amount: bigint;
}

export function storeSetPrice(src: SetPrice) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeUint(3391886567, 32);
      b_0.storeInt(src.amount, 257);
  };
}

export function loadSetPrice(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3391886567) { throw Error('Invalid prefix'); }
  let _amount = sc_0.loadIntBig(257);
  return { $$type: 'SetPrice' as const, amount: _amount };
}

function loadTupleSetPrice(source: TupleReader) {
  let _amount = source.readBigNumber();
  return { $$type: 'SetPrice' as const, amount: _amount };
}

function loadGetterTupleSetPrice(source: TupleReader) {
  let _amount = source.readBigNumber();
  return { $$type: 'SetPrice' as const, amount: _amount };
}

function storeTupleSetPrice(source: SetPrice) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserSetPrice(): DictionaryValue<SetPrice> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSetPrice(src)).endCell());
      },
      parse: (src) => {
          return loadSetPrice(src.loadRef().beginParse());
      }
  }
}

export type Sell$Data = {
  $$type: 'Sell$Data';
  owner: Address;
  tokenAddress: Address;
  usdtAddress: Address;
  tokenWalletAddress: Address;
  usdtWalletAddress: Address;
  tradeFee: bigint;
  price: bigint;
}

export function storeSell$Data(src: Sell$Data) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.owner);
      b_0.storeAddress(src.tokenAddress);
      b_0.storeAddress(src.usdtAddress);
      let b_1 = new Builder();
      b_1.storeAddress(src.tokenWalletAddress);
      b_1.storeAddress(src.usdtWalletAddress);
      b_1.storeInt(src.tradeFee, 257);
      let b_2 = new Builder();
      b_2.storeInt(src.price, 257);
      b_1.storeRef(b_2.endCell());
      b_0.storeRef(b_1.endCell());
  };
}

export function loadSell$Data(slice: Slice) {
  let sc_0 = slice;
  let _owner = sc_0.loadAddress();
  let _tokenAddress = sc_0.loadAddress();
  let _usdtAddress = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _tokenWalletAddress = sc_1.loadAddress();
  let _usdtWalletAddress = sc_1.loadAddress();
  let _tradeFee = sc_1.loadIntBig(257);
  let sc_2 = sc_1.loadRef().beginParse();
  let _price = sc_2.loadIntBig(257);
  return { $$type: 'Sell$Data' as const, owner: _owner, tokenAddress: _tokenAddress, usdtAddress: _usdtAddress, tokenWalletAddress: _tokenWalletAddress, usdtWalletAddress: _usdtWalletAddress, tradeFee: _tradeFee, price: _price };
}

function loadTupleSell$Data(source: TupleReader) {
  let _owner = source.readAddress();
  let _tokenAddress = source.readAddress();
  let _usdtAddress = source.readAddress();
  let _tokenWalletAddress = source.readAddress();
  let _usdtWalletAddress = source.readAddress();
  let _tradeFee = source.readBigNumber();
  let _price = source.readBigNumber();
  return { $$type: 'Sell$Data' as const, owner: _owner, tokenAddress: _tokenAddress, usdtAddress: _usdtAddress, tokenWalletAddress: _tokenWalletAddress, usdtWalletAddress: _usdtWalletAddress, tradeFee: _tradeFee, price: _price };
}

function loadGetterTupleSell$Data(source: TupleReader) {
  let _owner = source.readAddress();
  let _tokenAddress = source.readAddress();
  let _usdtAddress = source.readAddress();
  let _tokenWalletAddress = source.readAddress();
  let _usdtWalletAddress = source.readAddress();
  let _tradeFee = source.readBigNumber();
  let _price = source.readBigNumber();
  return { $$type: 'Sell$Data' as const, owner: _owner, tokenAddress: _tokenAddress, usdtAddress: _usdtAddress, tokenWalletAddress: _tokenWalletAddress, usdtWalletAddress: _usdtWalletAddress, tradeFee: _tradeFee, price: _price };
}

function storeTupleSell$Data(source: Sell$Data) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.owner);
  builder.writeAddress(source.tokenAddress);
  builder.writeAddress(source.usdtAddress);
  builder.writeAddress(source.tokenWalletAddress);
  builder.writeAddress(source.usdtWalletAddress);
  builder.writeNumber(source.tradeFee);
  builder.writeNumber(source.price);
  return builder.build();
}

function dictValueParserSell$Data(): DictionaryValue<Sell$Data> {
  return {
      serialize: (src, builder) => {
          builder.storeRef(beginCell().store(storeSell$Data(src)).endCell());
      },
      parse: (src) => {
          return loadSell$Data(src.loadRef().beginParse());
      }
  }
}

type Sell_init_args = {
  $$type: 'Sell_init_args';
  ownerAddress: Address;
  tokenAddress: Address;
  usdtAddress: Address;
}

function initSell_init_args(src: Sell_init_args) {
  return (builder: Builder) => {
      let b_0 = builder;
      b_0.storeAddress(src.ownerAddress);
      b_0.storeAddress(src.tokenAddress);
      b_0.storeAddress(src.usdtAddress);
  };
}

async function Sell_init(ownerAddress: Address, tokenAddress: Address, usdtAddress: Address) {
  const __code = Cell.fromBase64('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');
  const __system = Cell.fromBase64('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');
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initSell_init_args({ $$type: 'Sell_init_args', ownerAddress, tokenAddress, usdtAddress })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const Sell_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  11: { message: `'Unknown' error` },
  12: { message: `Fatal error` },
  13: { message: `Out of gas error` },
  14: { message: `Virtualization error` },
  32: { message: `Action list is invalid` },
  33: { message: `Action list is too long` },
  34: { message: `Action is invalid or not supported` },
  35: { message: `Invalid source address in outbound message` },
  36: { message: `Invalid destination address in outbound message` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  39: { message: `Outbound message does not fit into a cell after rewriting` },
  40: { message: `Cannot process a message` },
  41: { message: `Library reference is null` },
  42: { message: `Library change action error` },
  43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
  50: { message: `Account state size exceeded limits` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  3931: { message: `wrong amount` },
  4429: { message: `Invalid sender` },
  7411: { message: `Not enough TON in the contract` },
  15304: { message: `Not enough TON` },
  18451: { message: `Wrong amount` },
  43074: { message: `Invalid fee percentage` },
}

const Sell_types: ABIType[] = [
  {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
  {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
  {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
  {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
  {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
  {"name":"ChangeOwner","header":3698892769,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"ChangeOwnerOk","header":4125133755,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"Deploy","header":2750821052,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"DeployOk","header":810250248,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"FactoryDeploy","header":4028379533,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
  {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
  {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"WithdrawJetton","header":4093698073,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
  {"name":"WithdrawTon","header":2577720208,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
  {"name":"SetTokenAddress","header":2577186173,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"SetTokenWalletAddress","header":2355774250,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"SetUsdtWalletAddress","header":2695699963,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
  {"name":"SetTradeFee","header":594311571,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"SetPrice","header":3391886567,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
  {"name":"Sell$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"usdtAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenWalletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"usdtWalletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"tradeFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Sell_getters: ABIGetter[] = [
  {"name":"tokenAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"tokenWalletAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"usdtWalletAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
  {"name":"tradeFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"price","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
  {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const Sell_getterMapping: { [key: string]: string } = {
  'tokenAddress': 'getTokenAddress',
  'tokenWalletAddress': 'getTokenWalletAddress',
  'usdtWalletAddress': 'getUsdtWalletAddress',
  'tradeFee': 'getTradeFee',
  'price': 'getPrice',
  'owner': 'getOwner',
}

const Sell_receivers: ABIReceiver[] = [
  {"receiver":"internal","message":{"kind":"empty"}},
  {"receiver":"internal","message":{"kind":"typed","type":"JettonTransferNotification"}},
  {"receiver":"internal","message":{"kind":"typed","type":"WithdrawTon"}},
  {"receiver":"internal","message":{"kind":"typed","type":"WithdrawJetton"}},
  {"receiver":"internal","message":{"kind":"typed","type":"Excesses"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetTokenAddress"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetTokenWalletAddress"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetUsdtWalletAddress"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetTradeFee"}},
  {"receiver":"internal","message":{"kind":"typed","type":"SetPrice"}},
  {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
  {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Sell implements Contract {
  
  static async init(ownerAddress: Address, tokenAddress: Address, usdtAddress: Address) {
      return await Sell_init(ownerAddress, tokenAddress, usdtAddress);
  }
  
  static async fromInit(ownerAddress: Address, tokenAddress: Address, usdtAddress: Address) {
      const init = await Sell_init(ownerAddress, tokenAddress, usdtAddress);
      const address = contractAddress(0, init);
      return new Sell(address, init);
  }
  
  static fromAddress(address: Address) {
      return new Sell(address);
  }
  
  readonly address: Address; 
  readonly init?: { code: Cell, data: Cell };
  readonly abi: ContractABI = {
      types:  Sell_types,
      getters: Sell_getters,
      receivers: Sell_receivers,
      errors: Sell_errors,
  };
  
  private constructor(address: Address, init?: { code: Cell, data: Cell }) {
      this.address = address;
      this.init = init;
  }
  
  async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | JettonTransferNotification | WithdrawTon | WithdrawJetton | Excesses | SetTokenAddress | SetTokenWalletAddress | SetUsdtWalletAddress | SetTradeFee | SetPrice | ChangeOwner | Deploy) {
      
      let body: Cell | null = null;
      if (message === null) {
          body = new Cell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransferNotification') {
          body = beginCell().store(storeJettonTransferNotification(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawTon') {
          body = beginCell().store(storeWithdrawTon(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawJetton') {
          body = beginCell().store(storeWithdrawJetton(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Excesses') {
          body = beginCell().store(storeExcesses(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetTokenAddress') {
          body = beginCell().store(storeSetTokenAddress(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetTokenWalletAddress') {
          body = beginCell().store(storeSetTokenWalletAddress(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetUsdtWalletAddress') {
          body = beginCell().store(storeSetUsdtWalletAddress(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetTradeFee') {
          body = beginCell().store(storeSetTradeFee(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetPrice') {
          body = beginCell().store(storeSetPrice(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
          body = beginCell().store(storeChangeOwner(message)).endCell();
      }
      if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
          body = beginCell().store(storeDeploy(message)).endCell();
      }
      if (body === null) { throw new Error('Invalid message type'); }
      
      await provider.internal(via, { ...args, body: body });
      
  }
  
  async getTokenAddress(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('tokenAddress', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getTokenWalletAddress(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('tokenWalletAddress', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getUsdtWalletAddress(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('usdtWalletAddress', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
  async getTradeFee(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('tradeFee', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getPrice(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('price', builder.build())).stack;
      let result = source.readBigNumber();
      return result;
  }
  
  async getOwner(provider: ContractProvider) {
      let builder = new TupleBuilder();
      let source = (await provider.get('owner', builder.build())).stack;
      let result = source.readAddress();
      return result;
  }
  
}