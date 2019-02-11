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
    if(!tx || tx.length != 64) return undefined;
    
    let transactionInfo = await this.tronWeb.trx.getTransaction(tx);
    return transactionInfo;
  }

  getTxInfo = async function(tx) 
  {
    if(!tx || tx.length != 64) return undefined;
    
    let transactionInfo = await this.tronWeb.trx.getTransactionInfo(tx);
    if(transactionInfo.contract_address)
    {
      transactionInfo.contract_address = this.toBase58(transactionInfo.contract_address);
    }
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
      entry.inputs.forEach((input, index) => 
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

    /**

d4207948 -- function identifier, matches start of signature hash

// maybe types?
00000000000000000000000000000000000000000000000000000000000000a0 // 160 address[]
0000000000000000000000000000000000000000000000000000000000000120 // 288 uint256[]
0000000000000000000000000000000000000000000000000000000000000240 // 576 bool[]
00000000000000000000000000000000000000000000000000000000000002c0 // 704 uint8[]
0000000000000000000000000000000000000000000000000000000000000300 // 768 bytes32[]

- array(?)
0000000000000000000000000000000000000000000000000000000000000003 // 3
 - Address - maker
000000000000000000000000ac127337ba94be5eb6ce8b901a0ce653cee0cde0
 - address affiliate
0000000000000000000000000000000000000000000000000000000000000000
 - address affiliate
0000000000000000000000000000000000000000000000000000000000000000
 - array
 0000000000000000000000000000000000000000000000000000000000000008
 - quote
 800000000000000000000000f6ef482dd17493a9c10d2faf72b5538f18b1564d
 - base
 8000000000000000000000006f9ef3a2268e84ac0a91a595b247d763fc6bea83
 - makerAmount
 0000000000000000000000000000000000000000000000000000000037eeca51
 - rateNumerator
 00000000000000000000000000000000000000000000000000000000421667fd
 - rateDenominator
 0000000000000000000000000000000000000000000000000000000000030d40
 - creationDate
 000000000000000000000000000000000000000000000000000000005c60ac7f
 - expirationDate
 000000000000000000000000000000000000000000000000000000005c61fdff
 - takerAmount
 000000000000000000000000000000000000000000000000000000000662de00
 - array
 0000000000000000000000000000000000000000000000000000000000000003
 - isTakerBuy
 0000000000000000000000000000000000000000000000000000000000000000
 - takerAutoWithdraw
 0000000000000000000000000000000000000000000000000000000000000000
 - makerAutoWithdraw
 0000000000000000000000000000000000000000000000000000000000000000
 - array
 0000000000000000000000000000000000000000000000000000000000000001
 - mV: uint8
 000000000000000000000000000000000000000000000000000000000000001c
 - array
 0000000000000000000000000000000000000000000000000000000000000002
 - mR, mS: bytes32
9d2d70a7f675856a766d29be28b6e0f739e79a3f167143556d8652979bdeb653
771c76928dd76883d5bbf5ea6770fbbe277d2b97adbf439852f972101392ee77
    */

    return call;
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
