const TronWeb = require('tronweb');

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
    return await this.tronWeb.trx.getTransactionInfo(tx);
  }
  
  toBase58 = function(value)
  {
    return this.tronWeb.address.fromHex(value);
  }
  
  getAbi = async function(address)
  {
    const blah = await this.tronWeb.trx.getContract('TGBMCU2cDUMmtPVLYoLaHCh8oDpkw8TJ3f')
    console.log(blah)
    return 'fu';
    //return (await this.tronWeb.contract(address)).abi;
  }
} 