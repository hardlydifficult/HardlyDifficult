const TronWeb = require('tronweb');

export default class TronLibrary {
  constructor()
  {
    let node = 'https://api.shasta.trongrid.io/';
    this.tronWeb = new TronWeb(node, node, node,
      "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d9"
    )
  }

  toBase58 = function(value)
  {
    if(value.length == 40)
    {
      value = "0x" + value;
    }
    return this.tronWeb.address.fromHex(value);
  }
  
  toHex = function(value)
  {
    if(value.length == 40)
    {
      value = "0x" + value;
    }
    return this.tronWeb.address.toHex(value);
  }
} 
