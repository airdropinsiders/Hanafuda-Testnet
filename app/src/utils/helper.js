import a8_0x3f4555 from 'bip39';
import a8_0x3d7bd2 from 'moment-timezone';
import { ethers } from 'ethers';
import { Config } from '../../config/config.js';
import { Twist } from './twist.js';
import { Bless } from './bless.js';
import { RPC } from '../core/network/rpc.js';
export class Helper {
  static ['display'] = Config.DISPLAY;
  static ["twist"] = this.display == 'TWIST' ? new Twist() : new Bless();
  static ['myCode'] = 0x2409;
  static ["spinnerContent"] = (_0x4b0f04, _0x1cf2f9) => _0x4b0f04 ? "\nName                    : " + _0x1cf2f9.name + "\nAddress                 : " + _0x1cf2f9.address + "\nPoint                   : " + _0x1cf2f9.point + "\nBalance                 : " + _0x1cf2f9.balance + " " + RPC.SYMBOL + "\nDeposit Count | Today   : " + _0x1cf2f9.depo + " | " + _0x1cf2f9.depoToday + '/' + Config.DAILYDEPOSITCOUNT + "\nGrows | Garden Rewards  : " + _0x1cf2f9.grow + " | " + _0x1cf2f9.gardenReward + "\n               \nStatus : " + _0x1cf2f9.msg + "\nDelay : " + _0x1cf2f9.delay + "\n" : "\nName                    : " + _0x1cf2f9.name + "\nAddress                 : " + _0x1cf2f9.address + "\nPoint                   : " + _0x1cf2f9.point + "\nGrows | Garden Rewards  : " + _0x1cf2f9.grow + " | " + _0x1cf2f9.gardenReward + "\n               \nStatus : " + _0x1cf2f9.msg + "\nDelay : " + _0x1cf2f9.delay + "\n";
  static ['delay'] = (_0x3b2ac9, _0xf74b1f, _0x5f52be, _0x2df9ae) => {
    return new Promise(async _0x2debb8 => {
      let _0x201689 = _0x3b2ac9;
      if (_0xf74b1f != undefined) {
        await this.twist.log(_0x5f52be, _0xf74b1f, _0x2df9ae, "Delaying for " + this.msToTime(_0x3b2ac9));
      } else {
        await this.twist.info("Delaying for " + this.msToTime(_0x3b2ac9));
      }
      const _0x784c69 = setInterval(async () => {
        _0x201689 -= 0x3e8;
        if (_0xf74b1f != undefined) {
          await this.twist.log(_0x5f52be, _0xf74b1f, _0x2df9ae, "Delaying for " + this.msToTime(_0x201689));
        } else {
          await this.twist.info("Delaying for " + this.msToTime(_0x201689));
        }
        if (_0x201689 <= 0x0) {
          clearInterval(_0x784c69);
          _0x2debb8();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x784c69);
        await this.twist.clearInfo();
        if (_0xf74b1f) {
          await this.twist.log(_0x5f52be, _0xf74b1f, _0x2df9ae);
        }
        _0x2debb8();
      }, _0x3b2ac9);
    });
  };
  static ["randomUserAgent"]() {
    const _0x329556 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x329556[Math.floor(Math.random() * _0x329556.length)];
  }
  static ['readTime'](_0x3de016) {
    const _0x2cffa8 = a8_0x3d7bd2.unix(_0x3de016);
    return _0x2cffa8.format("YYYY-MM-DD HH:mm:ss");
  }
  static ['getCurrentTimestamp']() {
    const _0x132e3f = a8_0x3d7bd2().tz('Asia/Singapore').unix();
    return _0x132e3f.toString();
  }
  static ['random'](_0x31e84c, _0xdadff5) {
    const _0xaaa356 = Math.floor(Math.random() * (_0xdadff5 - _0x31e84c + 0x1)) + _0x31e84c;
    return _0xaaa356;
  }
  static ["randomFloat"](_0x490abe, _0x31b720, _0x17ca99 = 0x4) {
    const _0x5d190e = Math.random() * (_0x31b720 - _0x490abe) + _0x490abe;
    return parseFloat(_0x5d190e.toFixed(_0x17ca99));
  }
  static ["msToTime"](_0x2724c5) {
    const _0x531910 = Math.floor(_0x2724c5 / 3600000);
    const _0xa49eec = _0x2724c5 % 3600000;
    const _0x24a9f0 = Math.floor(_0xa49eec / 60000);
    const _0x410f5b = _0xa49eec % 60000;
    const _0x3510a3 = Math.round(_0x410f5b / 0x3e8);
    return _0x531910 + " Hours " + _0x24a9f0 + " Minutes " + _0x3510a3 + " Seconds";
  }
  static ['generateRandomString'](_0x173a0b) {
    let _0x40e14d = '';
    const _0x3b22ed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length;
    for (let _0x2c1ca1 = 0x0; _0x2c1ca1 < _0x173a0b; _0x2c1ca1++) {
      _0x40e14d += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * _0x3b22ed));
    }
    return _0x40e14d;
  }
  static ['serializeBigInt'] = _0x32fdc5 => {
    return JSON.parse(JSON.stringify(_0x32fdc5, (_0x5c8d5d, _0x41a4a1) => typeof _0x41a4a1 === 'bigint' ? _0x41a4a1.toString() : _0x41a4a1));
  };
  static ["isMnemonic"](_0xc041ea) {
    return a8_0x3f4555.validateMnemonic(_0xc041ea);
  }
  static ['isPrivateKey'](_0x117f8e) {
    const _0x299abc = _0x117f8e.replace(/^0x/, '');
    const _0xa6f356 = /^[a-fA-F0-9]{64}$/;
    return _0xa6f356.test(_0x299abc);
  }
  static ["determineType"](_0x48cf11) {
    if (this.isMnemonic(_0x48cf11)) {
      return "Secret Phrase";
    } else {
      return this.isPrivateKey(_0x48cf11) ? "Private Key" : 'Unknown';
    }
  }
  static ["generateNonce"]() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }
  static ['isToday'](_0x1bf76a) {
    const _0x53f0be = new Date(_0x1bf76a);
    const _0x586542 = new Date();
    _0x586542.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x49d79e = new Date(_0x53f0be);
    _0x49d79e.setHours(0x0, 0x0, 0x0, 0x0);
    if (_0x49d79e.getTime() === _0x586542.getTime()) {
      return true;
    } else {
      return false;
    }
  }
  static ['findFunctionBySelector'](_0x18a61b, _0x4862ce) {
    for (const _0x184c4d of _0x4862ce) {
      for (const _0x16b29f of _0x184c4d) {
        if (_0x16b29f.type === "function") {
          const _0x13ccd5 = _0x16b29f.name + '(' + _0x16b29f.inputs.map(_0x2273d4 => _0x2273d4.type).join(',') + ')';
          const _0x4bca47 = '0x' + ethers.keccak256(ethers.toUtf8Bytes(_0x13ccd5)).slice(0x0, 0x8);
          if (_0x4bca47.includes(_0x18a61b)) {
            console.log("Function found: " + _0x13ccd5);
            return _0x13ccd5;
          }
        }
      }
    }
    console.log("Function not found");
    return null;
  }
  static ["refCheck"](_0x1d15a0, _0x67baa3) {
    //if (_0x1d15a0 != this.myCode && _0x67baa3 != this.myCode) {
     // throw Error("Sorry, You cannot use this bot, please join with creator refferal code");
    //}
  }
  static ['showSkelLogo']() {
    console.log("AIRDROP INSIDER");
  }
}