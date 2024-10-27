export class GraphQlRequest {
  static ['getUserRequest'] = {
    'query': "\n      query CurrentUser {\n        currentUser {\n          id\n          sub\n          name\n          iconPath\n          depositCount\n          totalPoint\n          evmAddress {\n            userId\n            address\n          }\n          inviter {\n            id\n            name\n          }\n        }\n      }\n    ",
    'operationName': 'CurrentUser'
  };
  static ['getGarden'] = {
    'query': "\n          query GetGardenForCurrentUser {\n            getGardenForCurrentUser {\n              id\n              inviteCode\n              gardenDepositCount\n              gardenStatus {\n                id\n                activeEpoch\n                growActionCount\n                gardenRewardActionCount\n              }\n              gardenMilestoneRewardInfo {\n                id\n                gardenDepositCountWhenLastCalculated\n                lastAcquiredAt\n                createdAt\n              }\n              gardenMembers {\n                id\n                sub\n                name\n                iconPath\n                depositCount\n              }\n            }\n          }\n        ",
    'operationName': "GetGardenForCurrentUser"
  };
  static ["syncEthereumTxRequest"](_0x3e5ee5, _0x3fbdcb) {
    const _0xf0a1a5 = {
      'query': "\n            mutation SyncEthereumTx($chainId: Int!, $txHash: String!) {\n                syncEthereumTx(chainId: $chainId, txHash: $txHash)\n            }\n        ",
      'variables': {
        'chainId': _0x3e5ee5,
        'txHash': _0x3fbdcb
      },
      'operationName': 'SyncEthereumTx'
    };
    return _0xf0a1a5;
  }
  static ["growAction"] = {
    'query': "mutation issueGrowAction {\n      issueGrowAction\n    }",
    'operationName': "issueGrowAction"
  };
  static ["commitGrowAction"] = {
    'query': "mutation commitGrowAction {\n      commitGrowAction\n    }",
    'operationName': 'commitGrowAction'
  };
  static ["drawHanafuda"] = {
    'query': "mutation executeGardenRewardAction($limit: Int!) {\n      executeGardenRewardAction(limit: $limit) {\n        data {\n          cardId\n          group\n        }\n        isNew\n      }\n    }",
    'variables': {
      'limit': 0xa
    },
    'operationName': 'executeGardenRewardAction'
  };
}