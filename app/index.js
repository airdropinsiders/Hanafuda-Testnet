import { accountLists } from './accounts/accounts.js';
import { Config } from './config/config.js';
import { proxyList } from './config/proxy_list.js';
import a0_0x28b236 from './src/core/core.js';
import a0_0x47011a from './src/core/db/sqlite.js';
import { Helper } from './src/utils/helper.js';
import a0_0x420f84 from './src/utils/logger.js';
async function operation(_0x3097d0, _0x10f000) {
  const _0x40ac98 = new a0_0x28b236(_0x3097d0, _0x10f000);
  try {
    await _0x40ac98.getUserInfo(true);
    await Helper.refCheck(_0x40ac98.user.inviter.id, _0x40ac98.user.id);
    await _0x40ac98.getGardenInfo(true);
    await a0_0x47011a.createTable();
    const _0x301ba8 = Config.USEDEPOSIT ?? false;
    if (_0x301ba8) {
      await _0x40ac98.connectWallet();
      await _0x40ac98.getBalance();
      if (Number(_0x40ac98.balance) > Number(0.0001)) {
        let _0x24b51c = await a0_0x47011a.getTodayDepositLog(_0x40ac98.address);
        const _0x3da7f4 = Config.DAILYDEPOSITCOUNT ?? 0x1;
        while (_0x24b51c.length < _0x3da7f4) {
          await _0x40ac98.deposit();
          _0x24b51c = await a0_0x47011a.getTodayDepositLog(_0x40ac98.address);
        }
      } else {
        await Helper.delay(0x1388, _0x3097d0, "Balance insufficient to use Deposit, Minimum Balance is 0.0001", _0x40ac98);
      }
    }
    while (_0x40ac98.garden.gardenStatus.growActionCount != 0x0) {
      await _0x40ac98.startGrowAction();
    }
    while (_0x40ac98.garden.gardenStatus.gardenRewardActionCount >= 0xa) {
      await _0x40ac98.drawHanafuda();
    }
    const _0x377e26 = accountLists.find(_0x16c858 => _0x16c858.pk == _0x3097d0.pk);
    const _0x26b613 = accountLists.indexOf(_0x377e26);
    await Helper.delay(1800000, _0x3097d0, "Account " + (_0x26b613 + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(1800000), _0x40ac98);
    await operation(_0x3097d0, _0x10f000);
  } catch (_0x3089c4) {
    let _0x4b83ba = _0x3097d0;
    if (_0x3089c4.message) {
      if (_0x3089c4.message.includes('Unauthorized')) {
        _0x4b83ba = await _0x40ac98.tokenUpdate();
      } else {
        await Helper.delay(0x2710, _0x3097d0, "Error : " + _0x3089c4.message + ", Retry again after 10 Second", _0x40ac98);
      }
    } else {
      await Helper.delay(0x2710, _0x3097d0, "Error :" + JSON.stringify(_0x3089c4) + ", Retry again after 10 Second", _0x40ac98);
    }
    await operation(_0x4b83ba, _0x10f000);
  }
}
async function startBot() {
  return new Promise(async (_0x4329e2, _0x3308c7) => {
    try {
      a0_0x420f84.info("BOT STARTED");
      if (accountLists.length == 0x0) {
        throw Error("Please input your account first on accounts.js file");
      }
      if (proxyList.length != accountLists.length && proxyList.length != 0x0) {
        throw Error("You Have " + accountLists.length + " Accounts But Provide " + proxyList.length);
      }
      const _0xe134d6 = [];
      for (const _0x518939 of accountLists) {
        const _0x288432 = accountLists.indexOf(_0x518939);
        const _0x59b445 = proxyList[_0x288432];
        a0_0x47011a.firstOrCreateUserData(_0x518939.pk, _0x518939.refreshToken);
        _0xe134d6.push(operation(_0x518939, _0x59b445));
      }
      await Promise.all(_0xe134d6);
      _0x4329e2();
    } catch (_0xa51e7d) {
      a0_0x420f84.info("BOT STOPPED");
      a0_0x420f84.error(JSON.stringify(_0xa51e7d));
      _0x3308c7(_0xa51e7d);
    }
  });
}
(async () => {
  try {
    a0_0x420f84.clear();
    a0_0x420f84.info('');
    a0_0x420f84.info("Application Started");
    console.log("HANAFUDA TESTNET BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x4ebef7) {
    console.log("Error During executing bot", _0x4ebef7);
    await startBot();
  }
})();