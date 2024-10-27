import { Twisters } from 'twisters';
import a10_0x58e5d3 from './logger.js';
import a10_0x3770ce from '../core/core.js';
import { Config } from '../../config/config.js';
import { accountLists } from '../../accounts/accounts.js';
import a10_0x277cf7 from '../core/db/sqlite.js';
import { Helper } from './helper.js';
export class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  async ['log'](_0x47f65e = '', _0x25bb61 = '', _0x44f137 = new a10_0x3770ce(), _0x35c92d) {
    const _0x3f65c7 = accountLists.find(_0x376e19 => _0x376e19.pk == _0x25bb61.pk);
    const _0x79bb70 = accountLists.indexOf(_0x3f65c7);
    if (_0x35c92d == undefined) {
      a10_0x58e5d3.info("Account " + (_0x79bb70 + 0x1) + " - " + _0x47f65e);
      _0x35c92d = '-';
    }
    const _0x55e796 = _0x44f137.user ?? {};
    const _0x466e92 = _0x55e796.name ?? '-';
    const _0xa3ff9b = _0x55e796.totalPoint ?? '-';
    const _0x128602 = _0x55e796.depositCount ?? '-';
    const _0x3251ac = _0x55e796.evmAddress ?? {};
    const _0x2e2975 = _0x3251ac.address ?? '-';
    const _0x35a1ae = _0x44f137.garden ?? {};
    const _0x23971a = _0x35a1ae.gardenStatus ?? {};
    const _0x430c1a = _0x23971a.growActionCount ?? '?';
    const _0x16364a = _0x23971a.gardenRewardActionCount ?? '?';
    let _0xb08715 = {
      'msg': _0x47f65e,
      'delay': _0x35c92d,
      'name': _0x466e92,
      'point': _0xa3ff9b,
      'address': _0x2e2975,
      'depo': _0x128602,
      'grow': _0x430c1a,
      'gardenReward': _0x16364a
    };
    let _0x4c6810;
    const _0x5d72c6 = Config.USEDEPOSIT ?? false;
    if (_0x5d72c6) {
      const _0x3caa1d = _0x44f137.balance ?? '-';
      const _0x1a8ccf = _0x44f137.address ?? '-';
      const _0x1e8508 = (await a10_0x277cf7.getTodayDepositLog(_0x1a8ccf)).length;
      _0xb08715 = {
        ..._0xb08715,
        'balance': _0x3caa1d,
        'address': _0x1a8ccf,
        'depoToday': _0x1e8508
      };
      _0x4c6810 = "\n================== Account " + (_0x79bb70 + 0x1) + " =================\n" + Helper.spinnerContent(true, _0xb08715) + "\n==============================================";
    } else {
      _0x4c6810 = "\n================== Account " + (_0x79bb70 + 0x1) + " =================\n" + Helper.spinnerContent(false, _0xb08715) + "\n==============================================";
    }
    this.twisters.put(_0x3f65c7.pk, {
      'text': _0x4c6810
    });
  }
  ["info"](_0x495a6f = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0x495a6f + "\n=============================================="
    });
    return;
  }
  ['clearInfo']() {
    this.twisters.remove(0x2);
  }
  ["clear"](_0x4ef3c2) {
    this.twisters.remove(_0x4ef3c2.pk);
  }
}