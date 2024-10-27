import { ethers } from 'ethers';
import { Helper } from '../utils/helper.js';
import { API } from './api/api.js';
import { GraphQlRequest } from './graphql/graphql_request.js';
import { RPC } from './network/rpc.js';
import a3_0x9a9cf1 from '../utils/logger.js';
import { Config } from '../../config/config.js';
import { HANAFUDA } from './contract/hanafuda.js';
import a3_0x548d15 from './db/sqlite.js';
import 'fs';
import { accountLists } from '../../accounts/accounts.js';
export default class Core extends API {
  constructor(_0x4d6f1e, _0x2240d2) {
    super("https://hanafuda-backend-app-520478841386.us-central1.run.app", _0x2240d2);
    this.acc = _0x4d6f1e;
    this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);
  }
  async ['getUserInfo'](_0x2564ca = false) {
    try {
      if (_0x2564ca) {
        await Helper.delay(0x1f4, this.acc, "Getting User Info", this);
      }
      const _0x568678 = await this.fetch('/graphql', 'POST', this.acc.token, GraphQlRequest.getUserRequest);
      if (_0x568678.status == 0xc8 && !_0x568678.errors) {
        this.user = _0x568678.data.currentUser;
        if (_0x2564ca) {
          await Helper.delay(0x1f4, this.acc, "Successfully Get User Information", this);
        }
      } else {
        throw _0x568678;
      }
    } catch (_0x5af2aa) {
      await this.handleError(_0x5af2aa);
    }
  }
  async ['getGardenInfo'](_0x242d87 = false) {
    try {
      if (_0x242d87) {
        await Helper.delay(0x1f4, this.acc, "Getting Dashboard Info", this);
      }
      const _0x2bf46a = await this.fetch('/graphql', 'POST', this.acc.token, GraphQlRequest.getGarden);
      if (_0x2bf46a.status == 0xc8 && !_0x2bf46a.errors) {
        this.garden = _0x2bf46a.data.getGardenForCurrentUser;
        if (_0x242d87) {
          await Helper.delay(0x1f4, this.acc, "Successfully Get Dashboard Information", this);
        }
      } else {
        throw _0x2bf46a;
      }
    } catch (_0xf18c6d) {
      await this.handleError(_0xf18c6d);
    }
  }
  async ["drawHanafuda"]() {
    try {
      await Helper.delay(0x1f4, this.acc, "Drawing 10x Hanafuda", this);
      const _0xa22092 = await this.fetch("/graphql", 'POST', this.acc.token, GraphQlRequest.drawHanafuda);
      if (_0xa22092.status == 0xc8 && !_0xa22092.errors) {
        await this.getGardenInfo();
        await Helper.delay(0xbb8, this.acc, "Successfully Draw 10x Hanafuda see your collection at https://hanafuda.hana.network/collections", this);
      } else {
        throw _0xa22092;
      }
    } catch (_0xf00241) {
      await this.handleError(_0xf00241);
    }
  }
  async ['refreshToken']() {
    try {
      await Helper.delay(0x1f4, this.acc, "Getting New Token", this);
      const _0x1e94ae = await a3_0x548d15.firstOrCreateUserData(this.acc.pk);
      const _0x17646a = await this.fetch('https://securetoken.googleapis.com/v1/token?key=AIzaSyDipzN0VRfTPnMGhQ5PSzO27Cxm3DohJGY', 'POST', undefined, {
        'grant_type': 'refresh_token',
        'refresh_token': _0x1e94ae.refreshToken
      }, undefined, true);
      if (_0x17646a.status == 0xc8 && !_0x17646a.errors) {
        await Helper.delay(0x1f4, this.acc, "Successfully Get New Token", this);
        return _0x17646a;
      } else {
        throw _0x17646a;
      }
    } catch (_0x560d48) {
      await this.handleError(_0x560d48);
    }
  }
  async ["startGrowAction"]() {
    try {
      await Helper.delay(0x1f4, this.acc, "Starting Grow Action", this);
      const _0x9dcbb9 = await this.fetch("/graphql", 'POST', this.acc.token, GraphQlRequest.growAction);
      if (_0x9dcbb9.status == 0xc8 && !_0x9dcbb9.errors) {
        await this.commitGrowAction();
        await this.getGardenInfo();
        await this.getUserInfo();
        await Helper.delay(0x7d0, this.acc, "Successfully Execute Grow Action Got " + _0x9dcbb9.data.issueGrowAction + " Points", this);
      } else {
        throw _0x9dcbb9;
      }
    } catch (_0x522457) {
      await this.handleError(_0x522457);
    }
  }
  async ['commitGrowAction']() {
    try {
      await Helper.delay(0x1f4, this.acc, "Committing Grow Action", this);
      const _0x46532f = await this.fetch("/graphql", 'POST', this.acc.token, GraphQlRequest.commitGrowAction);
      if (_0x46532f.status == 0xc8 && !_0x46532f.errors) {
        await Helper.delay(0x1f4, this.acc, "Successfully Commit Grow Action", this);
      } else {
        throw _0x46532f;
      }
    } catch (_0x60409c) {
      await this.handleError(_0x60409c);
    }
  }
  async ['syncTx']() {
    try {
      await Helper.delay(0x1f4, this.acc, "Syncing TX", this);
      const _0x29f507 = await this.fetch('/graphql', 'POST', this.acc.token, GraphQlRequest.syncEthereumTxRequest(RPC.CHAINID, this.hash));
      if (_0x29f507.status == 0xc8 && !_0x29f507.errors) {
        await this.getUserInfo();
        await Helper.delay(0x1f4, this.acc, "Successfully Sync Deposit TX", this);
      } else {
        throw _0x29f507;
      }
    } catch (_0x32d035) {
      await this.handleError(_0x32d035);
    }
  }
  async ['connectWallet']() {
    try {
      if (!this.acc.pk) {
        throw new Error("Please Set Up your wallet Private Key");
      }
      const _0x353ea2 = this.acc.pk;
      await Helper.delay(0x1f4, this.acc, "Connecting to Account Wallet", this);
      const _0x32851b = Helper.determineType(_0x353ea2);
      a3_0x9a9cf1.info("Account Type : " + _0x32851b);
      if (_0x32851b == "Secret Phrase") {
        this.wallet = ethers.Wallet.fromPhrase(_0x353ea2, this.provider);
      } else {
        if (_0x32851b == "Private Key") {
          this.wallet = new ethers.Wallet(_0x353ea2.trim(), this.provider);
        } else {
          throw Error("Invalid account Secret Phrase or Private Key");
        }
      }
      this.address = this.wallet.address;
      await Helper.delay(0x1f4, this.acc, "Wallet connected..", this);
    } catch (_0x44360c) {
      await this.handleError(_0x44360c);
    }
  }
  async ["getBalance"](_0x41ca4 = false) {
    try {
      if (!_0x41ca4) {
        await Helper.delay(0x1f4, this.acc, "Getting Wallet Balance", this);
      }
      const _0x570dbb = ethers.formatEther(await this.provider.getBalance(this.wallet.address));
      this.balance = _0x570dbb;
      if (_0x41ca4) {
        await Helper.delay(0x1f4, this.acc, "Balance updated", this);
      }
    } catch (_0x57f8fa) {
      await this.handleError(_0x57f8fa);
    }
  }
  async ['deposit']() {
    try {
      await Helper.delay(0x7d0, this.acc, "Try To Deposit " + Config.DEPOSITAMOUNT + " " + RPC.SYMBOL + " to Hanafuda", this);
      const _0x7c451e = new ethers.Contract(HANAFUDA.CONTRACT, HANAFUDA.ABI, this.wallet);
      const _0x58628f = ethers.parseEther(Config.DEPOSITAMOUNT.toString());
      const _0x2ea612 = _0x7c451e['interface'].encodeFunctionData('depositETH');
      const _0xcf05e3 = await this.getOptimalNonce();
      const _0x1f122e = await this.estimateGasWithRetry(HANAFUDA.CONTRACT, _0x58628f, _0x2ea612);
      const _0x1aa535 = {
        'to': HANAFUDA.CONTRACT,
        'value': _0x58628f,
        'gasLimit': _0x1f122e,
        'gasPrice': ethers.parseUnits(Config.GWEIPRICE.toString(), "gwei"),
        'nonce': _0xcf05e3,
        'data': _0x2ea612
      };
      await this.executeTx(_0x1aa535);
      await a3_0x548d15.insertData(this.address, new Date().toISOString());
      if (this.hash) {
        await this.syncTx();
      }
      await Helper.delay(0x7d0, this.acc, "Successfully deposit to Hanafuda", this);
    } catch (_0x2f78fc) {
      throw _0x2f78fc;
    }
  }
  async ["handleError"](_0x5ad70b) {
    if (_0x5ad70b.errors) {
      if (_0x5ad70b.errors[0x0].message.includes("Unauthorized")) {
        throw Error('Unauthorized');
      } else {
        await Helper.delay(0x1388, this.acc, "Error : " + _0x5ad70b.errors[0x0].message, this);
      }
    } else {
      throw _0x5ad70b;
    }
  }
  async ['executeTx'](_0x50fede) {
    try {
      a3_0x9a9cf1.info("TX DATA " + JSON.stringify(Helper.serializeBigInt(_0x50fede)));
      await Helper.delay(0x1f4, this.acc, "Executing TX...", this);
      const _0x360317 = await this.wallet.sendTransaction(_0x50fede);
      if (Config.WAITFORBLOCKCONFIRMATION) {
        await Helper.delay(0x1f4, this.acc, "Tx Executed Waiting For Block Confirmation...", this);
        const _0x334218 = await _0x360317.wait();
        a3_0x9a9cf1.info("Tx Confirmed and Finalizing: " + JSON.stringify(_0x334218));
        this.hash = _0x334218.hash;
        await Helper.delay(0x1388, this.acc, "Tx Executed \n" + RPC.EXPLORER + 'tx/' + _0x334218.hash, this);
      } else {
        await Helper.delay(0x1f4, this.acc, "Tx Executed...", this);
        await Helper.delay(0x1388, this.acc, "Tx Executed \n" + RPC.EXPLORER + 'tx/' + _0x360317.hash, this);
      }
      await this.getBalance(true);
    } catch (_0x43fd84) {
      await this.handleError(_0x43fd84);
    }
  }
  async ['getOptimalNonce']() {
    try {
      const _0x95d26d = await this.provider.getTransactionCount(this.wallet.address, 'latest');
      const _0xd41637 = await this.provider.getTransactionCount(this.wallet.address, 'pending');
      const _0xb5d9b4 = _0xd41637 > _0x95d26d ? _0xd41637 : _0x95d26d;
      return _0xb5d9b4;
    } catch (_0x40faec) {
      await this.handleError(_0x40faec);
    }
  }
  async ['estimateGasWithRetry'](_0x1aad3c, _0x39b39b, _0x46f0a5, _0x4ce749 = 0x3, _0x40fefb = 0xbb8) {
    for (let _0x2d32f4 = 0x0; _0x2d32f4 < _0x4ce749; _0x2d32f4++) {
      try {
        a3_0x9a9cf1.info("Estimating Gas for " + _0x46f0a5 + " TX");
        const _0x392878 = await this.provider.estimateGas({
          'from': this.wallet.address,
          'to': _0x1aad3c,
          'value': _0x39b39b,
          'data': _0x46f0a5
        });
        return _0x392878;
      } catch (_0x4074d9) {
        await Helper.delay(_0x40fefb, this.acc, _0x4074d9.shortMessage + "... Attempt " + (_0x2d32f4 + 0x1) + " of " + _0x4ce749, this);
        if (_0x2d32f4 === _0x4ce749 - 0x1) {
          throw Error("Failed to estimate gas after " + _0x4ce749 + " attempts.");
        }
      }
    }
  }
  async ["tokenUpdate"]() {
    a3_0x9a9cf1.info("UPDATING TOKEN");
    const _0x2db6d4 = accountLists.indexOf(this.acc);
    const _0x513352 = accountLists[_0x2db6d4];
    if (_0x513352) {
      const _0x3b1687 = await this.refreshToken();
      _0x513352.token = _0x3b1687.id_token;
      _0x513352.refreshToken = _0x3b1687.refresh_token;
      await a3_0x548d15.updateUserData(_0x513352.pk, _0x513352.token, _0x513352.refreshToken);
    }
    return _0x513352;
  }
}