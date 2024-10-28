  import { ethers } from 'ethers';
  import { Helper } from '../utils/helper.js';
  import { API } from './api/api.js';
  import { GraphQlRequest } from './graphql/graphql_request.js';
  import { RPC } from './network/rpc.js';
  import a3_0xbb4b56 from '../utils/logger.js';
  import { Config } from '../../config/config.js';
  import { HANAFUDA } from './contract/hanafuda.js';
  import a3_0x514b0b from './db/sqlite.js';
  import 'fs';
  import { accountLists } from '../../accounts/accounts.js';
  export default class Core extends API {
    constructor(_0x30204a, _0xadf7a4) {
      super('https://hanafuda-backend-app-520478841386.us-central1.run.app', _0xadf7a4);
      this.acc = _0x30204a;
      this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);
    }
    async ['getUserInfo'](_0x4ffdb3 = false) {
      try {
        if (_0x4ffdb3) {
          await Helper.delay(0x1f4, this.acc, "Getting User Info", this);
        }
        const _0x59fb5e = await this.fetch("/graphql", 'POST', this.acc.token, GraphQlRequest.getUserRequest);
        if (_0x59fb5e.status == 0xc8 && !_0x59fb5e.errors) {
          this.user = _0x59fb5e.data.currentUser;
          if (_0x4ffdb3) {
            await Helper.delay(0x1f4, this.acc, "Successfully Get User Information", this);
          }
        } else {
          throw _0x59fb5e;
        }
      } catch (_0x5c157d) {
        await this.handleError(_0x5c157d);
      }
    }
    async ['getGardenInfo'](_0x36448b = false) {
      try {
        if (_0x36448b) {
          await Helper.delay(0x1f4, this.acc, "Getting Dashboard Info", this);
        }
        const _0x47a513 = await this.fetch('/graphql', 'POST', this.acc.token, GraphQlRequest.getGarden);
        if (_0x47a513.status == 0xc8 && !_0x47a513.errors) {
          this.garden = _0x47a513.data.getGardenForCurrentUser;
          if (_0x36448b) {
            await Helper.delay(0x1f4, this.acc, "Successfully Get Dashboard Information", this);
          }
        } else {
          throw _0x47a513;
        }
      } catch (_0x4cd179) {
        await this.handleError(_0x4cd179);
      }
    }
    async ['drawHanafuda']() {
      try {
        await Helper.delay(0x1f4, this.acc, "Drawing 10x Hanafuda", this);
        const _0x35c02b = await this.fetch('/graphql', "POST", this.acc.token, GraphQlRequest.drawHanafuda);
        if (_0x35c02b.status == 0xc8 && !_0x35c02b.errors) {
          await this.getGardenInfo();
          await Helper.delay(0xbb8, this.acc, "Successfully Draw 10x Hanafuda see your collection at https://hanafuda.hana.network/collections", this);
        } else {
          throw _0x35c02b;
        }
      } catch (_0x41c058) {
        await this.handleError(_0x41c058);
      }
    }
    async ['refreshToken']() {
      try {
        await Helper.delay(0x1f4, this.acc, "Getting New Token", this);
        const _0x57fb65 = await a3_0x514b0b.firstOrCreateUserData(this.acc.pk);
        const _0x1f4eb3 = await this.fetch("https://securetoken.googleapis.com/v1/token?key=AIzaSyDipzN0VRfTPnMGhQ5PSzO27Cxm3DohJGY", 'POST', undefined, {
          'grant_type': 'refresh_token',
          'refresh_token': _0x57fb65.refreshToken
        }, undefined, true);
        if (_0x1f4eb3.status == 0xc8 && !_0x1f4eb3.errors) {
          await Helper.delay(0x1f4, this.acc, "Successfully Get New Token", this);
          return _0x1f4eb3;
        } else {
          throw _0x1f4eb3;
        }
      } catch (_0x5b9016) {
        await this.handleError(_0x5b9016);
      }
    }
    async ['startGrowAction']() {
      try {
        await Helper.delay(0x1f4, this.acc, "Starting Grow Action", this);
        const _0x5c5eb6 = await this.fetch("/graphql", "POST", this.acc.token, GraphQlRequest.growAction);
        if (_0x5c5eb6.status == 0xc8 && !_0x5c5eb6.errors) {
          await this.commitGrowAction();
          this.user.totalPoint = Number(this.user.totalPoint) + Number(_0x5c5eb6.data.issueGrowAction);
          await Helper.delay(0x7d0, this.acc, "Successfully Execute Grow Action Got " + _0x5c5eb6.data.issueGrowAction + " Points", this);
        } else {
          throw _0x5c5eb6;
        }
      } catch (_0x3f204c) {
        await this.handleError(_0x3f204c);
      }
    }
    async ["commitGrowAction"]() {
      try {
        await Helper.delay(0x1f4, this.acc, "Committing Grow Action", this);
        const _0x330f63 = await this.fetch("/graphql", 'POST', this.acc.token, GraphQlRequest.commitGrowAction);
        if (_0x330f63.status == 0xc8 && !_0x330f63.errors) {
          await Helper.delay(0x1f4, this.acc, "Successfully Commit Grow Action", this);
        } else {
          throw _0x330f63;
        }
      } catch (_0x1e1dd2) {
        await this.handleError(_0x1e1dd2);
      }
    }
    async ['syncTx']() {
      try {
        await Helper.delay(0x1f4, this.acc, "Syncing TX", this);
        const _0x45e8f7 = await this.fetch("/graphql", 'POST', this.acc.token, GraphQlRequest.syncEthereumTxRequest(RPC.CHAINID, this.hash));
        if (_0x45e8f7.status == 0xc8 && !_0x45e8f7.errors) {
          await this.getUserInfo();
          await Helper.delay(0x1f4, this.acc, "Successfully Sync Deposit TX", this);
        } else {
          throw _0x45e8f7;
        }
      } catch (_0x3e0519) {
        await this.handleError(_0x3e0519);
      }
    }
    async ["connectWallet"]() {
      try {
        if (!this.acc.pk) {
          throw new Error("Please Set Up your wallet Private Key");
        }
        const _0x36f64f = this.acc.pk;
        await Helper.delay(0x1f4, this.acc, "Connecting to Account Wallet", this);
        const _0x480f16 = Helper.determineType(_0x36f64f);
        a3_0xbb4b56.info("Account Type : " + _0x480f16);
        if (_0x480f16 == "Secret Phrase") {
          this.wallet = ethers.Wallet.fromPhrase(_0x36f64f, this.provider);
        } else {
          if (_0x480f16 == "Private Key") {
            this.wallet = new ethers.Wallet(_0x36f64f.trim(), this.provider);
          } else {
            throw Error("Invalid account Secret Phrase or Private Key");
          }
        }
        this.address = this.wallet.address;
        await Helper.delay(0x1f4, this.acc, "Wallet connected..", this);
      } catch (_0x6769d2) {
        await this.handleError(_0x6769d2);
      }
    }
    async ['getBalance'](_0x3c0436 = false) {
      try {
        if (!_0x3c0436) {
          await Helper.delay(0x1f4, this.acc, "Getting Wallet Balance", this);
        }
        const _0x2eae96 = ethers.formatEther(await this.provider.getBalance(this.wallet.address));
        this.balance = _0x2eae96;
        if (_0x3c0436) {
          await Helper.delay(0x1f4, this.acc, "Balance updated", this);
        }
      } catch (_0x3f469b) {
        await this.handleError(_0x3f469b);
      }
    }
    async ['deposit']() {
      try {
        await Helper.delay(0x7d0, this.acc, "Try To Deposit " + Config.DEPOSITAMOUNT + " " + RPC.SYMBOL + " to Hanafuda", this);
        const _0x1bf475 = new ethers.Contract(HANAFUDA.CONTRACT, HANAFUDA.ABI, this.wallet);
        const _0x4e63a9 = ethers.parseEther(Config.DEPOSITAMOUNT.toString());
        const _0x27311f = _0x1bf475["interface"].encodeFunctionData('depositETH');
        const _0x1f56f3 = await this.getOptimalNonce();
        const _0x53a8d2 = await this.estimateGasWithRetry(HANAFUDA.CONTRACT, _0x4e63a9, _0x27311f);
        const _0x5774c0 = {
          'to': HANAFUDA.CONTRACT,
          'value': _0x4e63a9,
          'gasLimit': _0x53a8d2,
          'gasPrice': ethers.parseUnits(Config.GWEIPRICE.toString(), 'gwei'),
          'nonce': _0x1f56f3,
          'data': _0x27311f
        };
        await this.executeTx(_0x5774c0);
        await a3_0x514b0b.insertData(this.address, new Date().toISOString());
        if (this.hash) {
          await this.syncTx();
        }
        await Helper.delay(0x7d0, this.acc, "Successfully deposit to Hanafuda", this);
      } catch (_0x545d0d) {
        throw _0x545d0d;
      }
    }
    async ['handleError'](_0x127dfa) {
      if (_0x127dfa.errors) {
        if (_0x127dfa.errors[0x0].message.includes("Unauthorized")) {
          throw Error('Unauthorized');
        } else {
          await Helper.delay(0x1388, this.acc, "Error : " + _0x127dfa.errors[0x0].message, this);
        }
      } else {
        throw _0x127dfa;
      }
    }
    async ["executeTx"](_0x17519b) {
      try {
        a3_0xbb4b56.info("TX DATA " + JSON.stringify(Helper.serializeBigInt(_0x17519b)));
        await Helper.delay(0x1f4, this.acc, "Executing TX...", this);
        const _0x26a6e7 = await this.wallet.sendTransaction(_0x17519b);
        if (Config.WAITFORBLOCKCONFIRMATION) {
          await Helper.delay(0x1f4, this.acc, "Tx Executed Waiting For Block Confirmation...", this);
          const _0x2980dc = await _0x26a6e7.wait();
          a3_0xbb4b56.info("Tx Confirmed and Finalizing: " + JSON.stringify(_0x2980dc));
          this.hash = _0x2980dc.hash;
          await Helper.delay(0x1388, this.acc, "Tx Executed \n" + RPC.EXPLORER + 'tx/' + _0x2980dc.hash, this);
        } else {
          await Helper.delay(0x1f4, this.acc, "Tx Executed...", this);
          await Helper.delay(0x1388, this.acc, "Tx Executed \n" + RPC.EXPLORER + 'tx/' + _0x26a6e7.hash, this);
        }
        await this.getBalance(true);
      } catch (_0x285f8d) {
        await this.handleError(_0x285f8d);
      }
    }
    async ['getOptimalNonce']() {
      try {
        const _0x260427 = await this.provider.getTransactionCount(this.wallet.address, "latest");
        const _0x49355e = await this.provider.getTransactionCount(this.wallet.address, "pending");
        const _0x2f5a59 = _0x49355e > _0x260427 ? _0x49355e : _0x260427;
        return _0x2f5a59;
      } catch (_0x595f62) {
        await this.handleError(_0x595f62);
      }
    }
    async ['estimateGasWithRetry'](_0x5de16b, _0x4a13bf, _0x1ba5bb, _0x7aa4aa = 0x3, _0x61da6d = 0xbb8) {
      for (let _0x48e3f9 = 0x0; _0x48e3f9 < _0x7aa4aa; _0x48e3f9++) {
        try {
          a3_0xbb4b56.info("Estimating Gas for " + _0x1ba5bb + " TX");
          const _0x1fffb6 = await this.provider.estimateGas({
            'from': this.wallet.address,
            'to': _0x5de16b,
            'value': _0x4a13bf,
            'data': _0x1ba5bb
          });
          return _0x1fffb6;
        } catch (_0x3e3aff) {
          await Helper.delay(_0x61da6d, this.acc, _0x3e3aff.shortMessage + "... Attempt " + (_0x48e3f9 + 0x1) + " of " + _0x7aa4aa, this);
          if (_0x48e3f9 === _0x7aa4aa - 0x1) {
            throw Error("Failed to estimate gas after " + _0x7aa4aa + " attempts.");
          }
        }
      }
    }
    async ["tokenUpdate"]() {
      a3_0xbb4b56.info("UPDATING TOKEN");
      const _0x21d893 = accountLists.indexOf(this.acc);
      const _0x4820a3 = accountLists[_0x21d893];
      if (_0x4820a3) {
        const _0x117499 = await this.refreshToken();
        _0x4820a3.token = _0x117499.id_token;
        _0x4820a3.refreshToken = _0x117499.refresh_token;
        await a3_0x514b0b.updateUserData(_0x4820a3.pk, _0x4820a3.token, _0x4820a3.refreshToken);
      }
      return _0x4820a3;
    }
  }
