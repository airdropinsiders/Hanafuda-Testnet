export class HANAFUDA {
  static ["CONTRACT"] = '0xc5bf05cd32a14bffb705fb37a9d218895187376c';
  static ['ABI'] = [{
    'type': "function",
    'selector': "0xf2fde38b",
    'sig': 'transferOwnership(address)',
    'name': 'transferOwnership',
    'constant': false,
    'payable': false,
    'inputs': [{
      'type': 'address',
      'name': ''
    }]
  }, {
    'type': 'function',
    'selector': '0xf3fef3a3',
    'sig': "withdraw(address,uint256)",
    'name': 'withdraw',
    'constant': false,
    'payable': false,
    'inputs': [{
      'type': "address",
      'name': ''
    }, {
      'type': 'uint256',
      'name': ''
    }]
  }, {
    'type': 'function',
    'selector': '0xf6326fb3',
    'sig': "depositETH()",
    'name': 'depositETH',
    'constant': false,
    'payable': false,
    'inputs': [],
    'sigAlts': ["PacmanMultisigBackedByParadigm116974272()"]
  }, {
    'type': 'function',
    'selector': "0xce553dbb",
    'sig': "userEthDeposits(address)",
    'name': 'userEthDeposits',
    'constant': false,
    'payable': false,
    'inputs': [{
      'type': 'address',
      'name': ''
    }]
  }, {
    'type': 'function',
    'selector': "0xecf612fb",
    'sig': 'withdrawableAmount(address,address)',
    'name': 'withdrawableAmount',
    'constant': false,
    'payable': false,
    'inputs': [{
      'type': "address",
      'name': ''
    }, {
      'type': "address",
      'name': ''
    }]
  }, {
    'type': 'function',
    'selector': "0x436d8039",
    'sig': 'userDeposits(address,address)',
    'name': 'userDeposits',
    'constant': false,
    'payable': false,
    'inputs': [{
      'type': "address",
      'name': ''
    }, {
      'type': "address",
      'name': ''
    }]
  }, {
    'type': "function",
    'selector': '0x47e7ef24',
    'sig': 'deposit(address,uint256)',
    'name': "deposit",
    'constant': false,
    'payable': false,
    'inputs': [{
      'type': "address",
      'name': ''
    }, {
      'type': "uint256",
      'name': ''
    }]
  }, {
    'type': "function",
    'selector': '0x4d840bcc',
    'sig': 'isWithdrawable()',
    'name': 'isWithdrawable',
    'constant': false,
    'payable': false,
    'inputs': []
  }, {
    'type': 'function',
    'selector': '0x715018a6',
    'sig': 'renounceOwnership()',
    'name': "renounceOwnership",
    'constant': false,
    'payable': false,
    'inputs': []
  }, {
    'type': "function",
    'selector': "0x8da5cb5b",
    'sig': "owner()",
    'name': 'owner',
    'constant': false,
    'payable': false,
    'inputs': []
  }, {
    'type': "function",
    'selector': '0xb3ca3188',
    'sig': "cumulativeDeposits(address)",
    'name': 'cumulativeDeposits',
    'constant': false,
    'payable': false,
    'inputs': [{
      'type': 'address',
      'name': ''
    }]
  }];
}