  import a8_0xe07e35 from 'bip39';
  import a8_0x3fd7c2 from 'moment-timezone';
  import { ethers } from 'ethers';
  import { Config } from '../../config/config.js';
  import { Twist } from './twist.js';
  import { Bless } from './bless.js';
  import { RPC } from '../core/network/rpc.js';
  export class Helper {
    static ['display'] = Config.DISPLAY;
    static ['twist'] = this.display == 'TWIST' ? new Twist() : new Bless();
    static ['myCode'] = 0x2409;
    static ["spinnerContent"] = (_0x2a29ac, _0x3ed301) => _0x2a29ac ? "\nName                    : " + _0x3ed301.name + "\nAddress                 : " + _0x3ed301.address + "\nPoint                   : " + _0x3ed301.point + "\nBalance                 : " + _0x3ed301.balance + " " + RPC.SYMBOL + "\nDeposit Count | Today   : " + _0x3ed301.depo + " | " + _0x3ed301.depoToday + '/' + Config.DAILYDEPOSITCOUNT + "\nGrows | Garden Rewards  : " + _0x3ed301.grow + " | " + _0x3ed301.gardenReward + "\n               \nStatus : " + _0x3ed301.msg + "\nDelay : " + _0x3ed301.delay + "\n" : "\nName                    : " + _0x3ed301.name + "\nAddress                 : " + _0x3ed301.address + "\nPoint                   : " + _0x3ed301.point + "\nGrows | Garden Rewards  : " + _0x3ed301.grow + " | " + _0x3ed301.gardenReward + "\n               \nStatus : " + _0x3ed301.msg + "\nDelay : " + _0x3ed301.delay + "\n";
    static ["delay"] = (_0x40d156, _0x4e0b55, _0x215f49, _0x5368a5) => {
      return new Promise(async _0x4b0a18 => {
        let _0x17f788 = _0x40d156;
        if (_0x4e0b55 != undefined) {
          await this.twist.log(_0x215f49, _0x4e0b55, _0x5368a5, "Delaying for " + this.msToTime(_0x40d156));
        } else {
          await this.twist.info("Delaying for " + this.msToTime(_0x40d156));
        }
        const _0x1bc394 = setInterval(async () => {
          _0x17f788 -= 0x3e8;
          if (_0x4e0b55 != undefined) {
            await this.twist.log(_0x215f49, _0x4e0b55, _0x5368a5, "Delaying for " + this.msToTime(_0x17f788));
          } else {
            await this.twist.info("Delaying for " + this.msToTime(_0x17f788));
          }
          if (_0x17f788 <= 0x0) {
            clearInterval(_0x1bc394);
            _0x4b0a18();
          }
        }, 0x3e8);
        setTimeout(async () => {
          clearInterval(_0x1bc394);
          await this.twist.clearInfo();
          if (_0x4e0b55) {
            await this.twist.log(_0x215f49, _0x4e0b55, _0x5368a5);
          }
          _0x4b0a18();
        }, _0x40d156);
      });
    };
    static ["randomUserAgent"]() {
      const _0x5d3baf = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
      return _0x5d3baf[Math.floor(Math.random() * _0x5d3baf.length)];
    }
    static ['readTime'](_0x53bb52) {
      const _0x23668f = a8_0x3fd7c2.unix(_0x53bb52);
      return _0x23668f.format("YYYY-MM-DD HH:mm:ss");
    }
    static ['getCurrentTimestamp']() {
      const _0x146983 = a8_0x3fd7c2().tz('Asia/Singapore').unix();
      return _0x146983.toString();
    }
    static ['random'](_0x5297d9, _0x326bac) {
      const _0x1a0739 = Math.floor(Math.random() * (_0x326bac - _0x5297d9 + 0x1)) + _0x5297d9;
      return _0x1a0739;
    }
    static ['randomFloat'](_0x57bc88, _0x1b969a, _0xb3484e = 0x4) {
      const _0x231176 = Math.random() * (_0x1b969a - _0x57bc88) + _0x57bc88;
      return parseFloat(_0x231176.toFixed(_0xb3484e));
    }
    static ["msToTime"](_0x3cf159) {
      const _0x186653 = Math.floor(_0x3cf159 / 3600000);
      const _0xcd11a2 = _0x3cf159 % 3600000;
      const _0x324f82 = Math.floor(_0xcd11a2 / 60000);
      const _0x281d06 = _0xcd11a2 % 60000;
      const _0x2f5b78 = Math.round(_0x281d06 / 0x3e8);
      return _0x186653 + " Hours " + _0x324f82 + " Minutes " + _0x2f5b78 + " Seconds";
    }
    static ['generateRandomString'](_0x197197) {
      let _0x14cafc = '';
      const _0xc2552a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length;
      for (let _0x3bd450 = 0x0; _0x3bd450 < _0x197197; _0x3bd450++) {
        _0x14cafc += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * _0xc2552a));
      }
      return _0x14cafc;
    }
    static ["serializeBigInt"] = _0x279949 => {
      return JSON.parse(JSON.stringify(_0x279949, (_0x681867, _0x456f15) => typeof _0x456f15 === "bigint" ? _0x456f15.toString() : _0x456f15));
    };
    static ["isMnemonic"](_0x4b21a2) {
      return a8_0xe07e35.validateMnemonic(_0x4b21a2);
    }
    static ["isPrivateKey"](_0x4db125) {
      const _0x17a3f4 = _0x4db125.replace(/^0x/, '');
      const _0x33d2ed = /^[a-fA-F0-9]{64}$/;
      return _0x33d2ed.test(_0x17a3f4);
    }
    static ["determineType"](_0x243cca) {
      if (this.isMnemonic(_0x243cca)) {
        return "Secret Phrase";
      } else {
        return this.isPrivateKey(_0x243cca) ? "Private Key" : 'Unknown';
      }
    }
    static ['generateNonce']() {
      return ethers.hexlify(ethers.randomBytes(0x10));
    }
    static ['isToday'](_0x1ef7e4) {
      const _0x46ef35 = new Date(_0x1ef7e4);
      const _0x336039 = new Date();
      _0x336039.setHours(0x0, 0x0, 0x0, 0x0);
      const _0x4d6075 = new Date(_0x46ef35);
      _0x4d6075.setHours(0x0, 0x0, 0x0, 0x0);
      if (_0x4d6075.getTime() === _0x336039.getTime()) {
        return true;
      } else {
        return false;
      }
    }
    static ['findFunctionBySelector'](_0x3503f6, _0x2ab9a0) {
      for (const _0x1070cc of _0x2ab9a0) {
        for (const _0x3f50f2 of _0x1070cc) {
          if (_0x3f50f2.type === "function") {
            const _0x4178ff = _0x3f50f2.name + '(' + _0x3f50f2.inputs.map(_0x575b8e => _0x575b8e.type).join(',') + ')';
            const _0x5b0962 = '0x' + ethers.keccak256(ethers.toUtf8Bytes(_0x4178ff)).slice(0x0, 0x8);
            if (_0x5b0962.includes(_0x3503f6)) {
              console.log("Function found: " + _0x4178ff);
              return _0x4178ff;
            }
          }
        }
      }
      console.log("Function not found");
      return null;
    }
    static ['showSkelLogo']() {
      console.log("AirdropInsider");
    }
  }
