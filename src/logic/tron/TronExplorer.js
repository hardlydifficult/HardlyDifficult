const TronWeb = require('tronweb');
import {keccak256} from 'js-sha3';
const BigNumber = require('bignumber.js');

// Goal: given a tx get the timestamp

export default class TronExplorer {
  constructor()
  {
    this.tronWeb = new TronWeb(
      'https://api.shasta.trongrid.io/',
      'https://api.shasta.trongrid.io/',
      'https://api.shasta.trongrid.io/',
      "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d9"
    )
  }

  getTx = async function(tx) 
  {
    let transactionInfo = await this.tronWeb.trx.getTransactionInfo(tx);
    transactionInfo.contract_address = this.toBase58(transactionInfo.contract_address);
    return transactionInfo;
  }
  
  toBase58 = function(value)
  {
    if(value.length == 40)
    {
      value = "0x" + value;
    }
    return this.tronWeb.address.fromHex(value);
  }
  
  getAbi = async function(address)
  {
    return await this.tronWeb.trx.getContract(this.toBase58(address));
  }

  parseLog = async function(log)
  {
    const abi = (await this.getAbi(log.address)).abi.entrys;
    for(let i = 0; i < abi.length; i++)
    {
      let event = abi[i];
      if(event.type != 'Event') continue;

      let signature = `${event.name}(`;
      event.inputs.forEach((input, index) => 
      {
        if(index > 0)
        {
          signature += ',';
        }

        signature += input.type;
      });
      signature += ')';
      //console.log(signature);
      const hash = keccak256(this.tronWeb.utils.code.stringToBytes(signature))
      //console.log(hash.toString());
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
            value = this.format(log.topics[indexedId++], input.type);
          }
          else
          {
            value = this.format(data.substring(0, 64), input.type);
            data = data.substring(64);
          }
          call += value;
          params.push({type: input.type, value});
        });
        if(data.length > 0) throw new Error(data);
        call += ')';

        return {
          address: this.toBase58(log.address),
          signature,
          call,
          event: event.name,
          params
        }
      }
    }
  }

  format = function(value, type)
  {
    switch(type)
    {
      case 'address':
        return this.toBase58(value.substring(value.length - 40));
      case 'uint256':
        return new BigNumber(value, 16).toFixed();
      case 'bytes32':
        return value;
      case 'bool':
        return value.includes('1');
      default:
        throw new Error()
    }
  }
} 
