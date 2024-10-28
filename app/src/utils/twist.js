  import { Twisters } from 'twisters';
  import a10_0x5960e3 from './logger.js';
  import a10_0x577aab from '../core/core.js';
  import { Config } from '../../config/config.js';
  import { accountLists } from '../../accounts/accounts.js';
  import a10_0x1f908c from '../core/db/sqlite.js';
  import { Helper } from './helper.js';
  export class Twist {
    constructor() {
      this.twisters = new Twisters();
    }
    async ['log'](_0x294fcc = '', _0x7d5b3b = '', _0xdefc03 = new a10_0x577aab(), _0x21145b) {
      const _0x3747ee = accountLists.find(_0xe763ec => _0xe763ec.pk == _0x7d5b3b.pk);
      const _0x1f2848 = accountLists.indexOf(_0x3747ee);
      if (_0x21145b == undefined) {
        a10_0x5960e3.info("Account " + (_0x1f2848 + 0x1) + " - " + _0x294fcc);
        _0x21145b = '-';
      }
      const _0x17a957 = _0xdefc03.user ?? {};
      const _0x52e71a = _0x17a957.name ?? '-';
      const _0x21a89d = _0x17a957.totalPoint ?? '-';
      const _0x381639 = _0x17a957.depositCount ?? '-';
      const _0xe6c3c1 = _0x17a957.evmAddress ?? {};
      const _0x50d5ba = _0xe6c3c1.address ?? '-';
      const _0x46e462 = _0xdefc03.garden ?? {};
      const _0x4567ea = _0x46e462.gardenStatus ?? {};
      const _0x2aa6fa = _0x4567ea.growActionCount ?? '?';
      const _0x129714 = _0x4567ea.gardenRewardActionCount ?? '?';
      let _0x4cf87b = {
        'msg': _0x294fcc,
        'delay': _0x21145b,
        'name': _0x52e71a,
        'point': _0x21a89d,
        'address': _0x50d5ba,
        'depo': _0x381639,
        'grow': _0x2aa6fa,
        'gardenReward': _0x129714
      };
      let _0x2da8d1;
      const _0x31e922 = Config.USEDEPOSIT ?? false;
      if (_0x31e922) {
        const _0x4b4824 = _0xdefc03.balance ?? '-';
        const _0x53cd30 = _0xdefc03.address ?? '-';
        const _0x5c7f5d = (await a10_0x1f908c.getTodayDepositLog(_0x53cd30)).length;
        _0x4cf87b = {
          ..._0x4cf87b,
          'balance': _0x4b4824,
          'address': _0x53cd30,
          'depoToday': _0x5c7f5d
        };
        _0x2da8d1 = "\n================== Account " + (_0x1f2848 + 0x1) + " =================\n" + Helper.spinnerContent(true, _0x4cf87b) + "\n==============================================";
      } else {
        _0x2da8d1 = "\n================== Account " + (_0x1f2848 + 0x1) + " =================\n" + Helper.spinnerContent(false, _0x4cf87b) + "\n==============================================";
      }
      this.twisters.put(_0x3747ee.pk, {
        'text': _0x2da8d1
      });
    }
    ['info'](_0x186521 = '') {
      this.twisters.put(0x2, {
        'text': "\n==============================================\nInfo : " + _0x186521 + "\n=============================================="
      });
      return;
    }
    ['clearInfo']() {
      this.twisters.remove(0x2);
    }
    ["clear"](_0x1c5036) {
      this.twisters.remove(_0x1c5036.pk);
    }
  }
