const TronWeb = require('tronweb');
import {keccak256} from 'js-sha3';
const BigNumber = require('bignumber.js');
import TronLibrary from './TronLibrary.js';

export default class TronExplorer {
  constructor(network)
  {
    this.network = network;
    let node;
    switch(this.network)
    {
      case 'shasta':
        node = 'https://api.shasta.trongrid.io/';
        break;
      case 'mainnet':
        node = 'https://api.trongrid.io/';
        break;
      default:
        throw new Error('Missing network');
    }
    this.tronLibrary = new TronLibrary();
    this.tronWeb = new TronWeb(node, node, node,
      "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d9"
    )
  }

  getTx = async function(tx) 
  {
    if(!tx || tx.length != 64) return undefined;
    
    let transactionInfo = await this.tronWeb.trx.getTransaction(tx);
    return transactionInfo;
  }

  getTxInfo = async function(tx) 
  {
    if(!tx || tx.length != 64) return undefined;
    
    let transactionInfo = await this.tronWeb.trx.getTransactionInfo(tx);
    return transactionInfo;
  }
  
  getAbi = async function(address)
  {
    if(!address) return undefined;
    const abi = await this.tronWeb.trx.getContract(this.tronLibrary.toBase58(address));
    return abi;
  }

  parseLog = async function(log)
  {
    const abi = (await this.getAbi(log.address)).abi.entrys;
    for(let i = 0; i < abi.length; i++)
    {
      let event = abi[i];
      if(event.type != 'Event') continue;

      let signature = `${event.name}(`;
      if(event.inputs)
      {
        event.inputs.forEach((input, index) => 
        {
          if(index > 0)
          {
            signature += ',';
          }

          signature += input.type;
        });
      }
      signature += ')';
      const hash = keccak256(this.tronWeb.utils.code.stringToBytes(signature))
      // console.log(`${signature}: ${hash.toString()}`);
      if(hash.toString() == log.topics[0].toString()) 
      {
        let call = `${event.name}(`;
        let indexedId = 1;
        let data = log.data;
        let params = [];
        event.inputs.forEach((input, index) => 
        {
          if(index > 0)
          {
            call += ',';
          }
          let value;
          if(input.indexed)
          {
            value = log.topics[indexedId++];
          }
          else
          {
            value = data.substring(0, 64);
            data = data.substring(64);
          }
          call += value;
          params.push({type: input.type, value});
        });
        if(data.length > 0) throw new Error(data);
        call += ')';

        return {
          address: '41' + log.address,
          signature,
          call,
          event: event.name,
          params
        }
      }
    }
  }

  parseCall = async function(contractAddress, callData)
  {
    let call = {};
    const abi = (await this.getAbi(contractAddress)).abi.entrys;
    let entry;
    for(let i = 0; i < abi.length; i++)
    {
      entry = abi[i];
      if(entry.type != 'Function') continue;

      let signature = `${entry.name}(`;
      if(entry.inputs)
      {
        entry.inputs.forEach((input, index) => 
        {
          if(index > 0)
          {
            signature += ',';
          }

          signature += input.type;
        });
      }
      signature += ')';
      const hash = keccak256(this.tronWeb.utils.code.stringToBytes(signature)).substring(0, 8);
      // console.log(`${signature}: ${hash.toString()}`);
      if(callData.startsWith(hash))
      {
        call.signature = signature;
        call.function = entry.name;
        call.params = [];
        break;
      }
    }

    if(entry.inputs)
    {
      let pos = 8;
      pos += 64 * entry.inputs.length;
      entry.inputs.forEach((input) => 
      {
        let param = {
          type: input.type
        };

        if(input.type.endsWith('[]'))
        {
          const arrayLength = new BigNumber(callData.substr(pos, 64), 16).toNumber();
          pos += 64;
          param.value = [];
          for(let i = 0; i < arrayLength; i++)
          {
            param.value.push(callData.substr(pos, 64));
            pos += 64;
          }
        }
        else
        {
          param.value = callData.substr(pos, 64);
          pos += 64;
        }

        call.params.push(param);
      });
    }

    return call;
  }
} 