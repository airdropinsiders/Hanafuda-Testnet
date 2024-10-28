import a8_0x49c96a from 'bip39';
import a8_0x26e9bb from 'moment-timezone';
import { ethers } from 'ethers';
import { Config } from '../../config/config.js';
import { Twist } from './twist.js';
import { Bless } from './bless.js';
import { RPC } from '../core/network/rpc.js';

export class Helper {
  static ["display"] = Config.DISPLAY;
  static ['twist'] = this.display == 'TWIST' ? new Twist() : new Bless();
  static ['myCode'] = '21OM73';
  static ['spinnerContent'] = (_0x4699b4, _0x4d7f95) => _0x4699b4 ? "\nName                    : " + _0x4d7f95.name + "\nAddress                 : " + _0x4d7f95.address + "\nPoint                   : " + _0x4d7f95.point + "\nDeposit Count | Today   : " + _0x4d7f95.depo + " | " + _0x4d7f95.depoToday + '/' + Config.DAILYDEPOSITCOUNT + "\nBalance                 : " + _0x4d7f95.balance + " " + RPC.SYMBOL + "\nGrows | Garden Rewards  : " + _0x4d7f95.grow + " | " + _0x4d7f95.gardenReward + "\n               \nStatus : " + _0x4d7f95.msg + "\nDelay : " + _0x4d7f95.delay + "\n" : "\nName                    : " + _0x4d7f95.name + "\nAddress                 : " + _0x4d7f95.address + "\nPoint                   : " + _0x4d7f95.point + "\nGrows | Garden Rewards  : " + _0x4d7f95.grow + " | " + _0x4d7f95.gardenReward + "\n               \nStatus : " + _0x4d7f95.msg + "\nDelay : " + _0x4d7f95.delay + "\n";
  static ['delay'] = (_0x434d5e, _0x1db6c9, _0x22641a, _0x524994) => {
    return new Promise(async _0x1b0c3a => {
      let _0xc53846 = _0x434d5e;
      if (_0x1db6c9 != undefined) {
        await this.twist.log(_0x22641a, _0x1db6c9, _0x524994, "Delaying for " + this.msToTime(_0x434d5e));
      } else {
        await this.twist.info("Delaying for " + this.msToTime(_0x434d5e));
      }
      const _0x142f6b = setInterval(async () => {
        _0xc53846 -= 0x3e8;
        if (_0x1db6c9 != undefined) {
          await this.twist.log(_0x22641a, _0x1db6c9, _0x524994, "Delaying for " + this.msToTime(_0xc53846));
        } else {
          await this.twist.info("Delaying for " + this.msToTime(_0xc53846));
        }
        if (_0xc53846 <= 0x0) {
          clearInterval(_0x142f6b);
          _0x1b0c3a();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x142f6b);
        await this.twist.clearInfo();
        if (_0x1db6c9) {
          await this.twist.log(_0x22641a, _0x1db6c9, _0x524994);
        }
        _0x1b0c3a();
      }, _0x434d5e);
    });
  };
  static ["randomUserAgent"]() {
    const _0x390b16 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x390b16[Math.floor(Math.random() * _0x390b16.length)];
  }
  static ["readTime"](_0x1d06a7) {
    const _0x116746 = a8_0x26e9bb.unix(_0x1d06a7);
    return _0x116746.format("YYYY-MM-DD HH:mm:ss");
  }
  static ['getCurrentTimestamp']() {
    const _0x44f201 = a8_0x26e9bb().tz('Asia/Singapore').unix();
    return _0x44f201.toString();
  }
  static ['random'](_0x4d2309, _0x1c7bdb) {
    const _0x32f83d = Math.floor(Math.random() * (_0x1c7bdb - _0x4d2309 + 0x1)) + _0x4d2309;
    return _0x32f83d;
  }
  static ['randomFloat'](_0x11890a, _0x5b333e, _0x5f0b67 = 0x4) {
    const _0x1fb923 = Math.random() * (_0x5b333e - _0x11890a) + _0x11890a;
    return parseFloat(_0x1fb923.toFixed(_0x5f0b67));
  }
  static ["msToTime"](_0x527287) {
    const _0x23fc4f = Math.floor(_0x527287 / 3600000);
    const _0x1d99c4 = _0x527287 % 3600000;
    const _0x4f8b6d = Math.floor(_0x1d99c4 / 60000);
    const _0x202a52 = _0x1d99c4 % 60000;
    const _0x1c7cf8 = Math.round(_0x202a52 / 0x3e8);
    return _0x23fc4f + " Hours " + _0x4f8b6d + " Minutes " + _0x1c7cf8 + " Seconds";
  }
  static ["generateRandomString"](_0x57c31f) {
    let _0x2f21f8 = '';
    const _0x34eb58 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length;
    for (let _0x51e341 = 0x0; _0x51e341 < _0x57c31f; _0x51e341++) {
      _0x2f21f8 += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * _0x34eb58));
    }
    return _0x2f21f8;
  }
  static ["serializeBigInt"] = _0x415e24 => {
    return JSON.parse(JSON.stringify(_0x415e24, (_0x46b18b, _0x2c3468) => typeof _0x2c3468 === 'bigint' ? _0x2c3468.toString() : _0x2c3468));
  };
  static ['isMnemonic'](_0x22144f) {
    return a8_0x49c96a.validateMnemonic(_0x22144f);
  }
  static ["isPrivateKey"](_0x33b70d) {
    const _0x56fe2c = _0x33b70d.replace(/^0x/, '');
    const _0x132056 = /^[a-fA-F0-9]{64}$/;
    return _0x132056.test(_0x56fe2c);
  }
  static ['determineType'](_0x2f13e4) {
    if (this.isMnemonic(_0x2f13e4)) {
      return "Secret Phrase";
    } else {
      if (this.isPrivateKey(_0x2f13e4)) {
        return "Private Key";
      } else {
        return 'Unknown';
      }
    }
  }
  static ['generateNonce']() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }
  static ['isToday'](_0x2134a0) {
    const _0x4c8af4 = new Date(_0x2134a0);
    const _0x2ff2a7 = new Date();
    _0x2ff2a7.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x2166eb = new Date(_0x4c8af4);
    _0x2166eb.setHours(0x0, 0x0, 0x0, 0x0);
    if (_0x2166eb.getTime() === _0x2ff2a7.getTime()) {
      return true;
    } else {
      return false;
    }
  }
  static ['findFunctionBySelector'](_0x1d319f, _0x3d11f3) {
    for (const _0x5f3821 of _0x3d11f3) {
      for (const _0xda675f of _0x5f3821) {
        if (_0xda675f.type === 'function') {
          const _0x4256a3 = _0xda675f.name + '(' + _0xda675f.inputs.map(_0x163948 => _0x163948.type).join(',') + ')';
          const _0x1eaa8e = '0x' + ethers.keccak256(ethers.toUtf8Bytes(_0x4256a3)).slice(0x0, 0x8);
          if (_0x1eaa8e.includes(_0x1d319f)) {
            console.log("Function found: " + _0x4256a3);
            return _0x4256a3;
          }
        }
      }
    }
    console.log("Function not found");
    return null;
  }
  static ["showSkelLogo"]() {
    console.log("AirdropInsider");
  }
}

