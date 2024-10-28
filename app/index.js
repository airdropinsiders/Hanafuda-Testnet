import { accountLists } from './accounts/accounts.js';
import { Config } from './config/config.js';
import { proxyList } from './config/proxy_list.js';
import a0_0x12a82e from './src/core/core.js';
import a0_0x30e31d from './src/core/db/sqlite.js';
import { Helper } from './src/utils/helper.js';
import a0_0x2be55c from './src/utils/logger.js';
async function operation(_0x43244a, _0x1f3689) {
  const _0x29cd0b = new a0_0x12a82e(_0x43244a, _0x1f3689);
  try {
    await _0x29cd0b.getUserInfo(true);
    await _0x29cd0b.getGardenInfo(true);
    await a0_0x30e31d.createTable();
    const _0x5cec01 = Config.USEDEPOSIT ?? false;
    if (_0x5cec01) {
      await _0x29cd0b.connectWallet();
      await _0x29cd0b.getBalance();
      if (Number(_0x29cd0b.balance) > Number(0.0001)) {
        let _0x4c68bd = await a0_0x30e31d.getTodayDepositLog(_0x29cd0b.address);
        const _0x2f9647 = Config.DAILYDEPOSITCOUNT ?? 0x1;
        while (_0x4c68bd.length < _0x2f9647) {
          await _0x29cd0b.deposit();
          _0x4c68bd = await a0_0x30e31d.getTodayDepositLog(_0x29cd0b.address);
        }
      } else {
        await Helper.delay(0x1388, _0x43244a, "Balance insufficient to use Deposit, Minimum Balance is 0.0001", _0x29cd0b);
      }
    }
    let _0x541e4e = _0x29cd0b.garden.gardenStatus.growActionCount;
    while (_0x541e4e != 0x0) {
      await _0x29cd0b.startGrowAction();
      _0x541e4e -= 0x1;
    }
    await this.getGardenInfo(true);
    await this.getUserInfo(true);
    while (_0x29cd0b.garden.gardenStatus.gardenRewardActionCount >= 0xa) {
      await _0x29cd0b.drawHanafuda();
    }
    const _0x3ecb55 = accountLists.find(_0x5a7dab => _0x5a7dab.pk == _0x43244a.pk);
    const _0x242faf = accountLists.indexOf(_0x3ecb55);
    await Helper.delay(1800000, _0x43244a, "Account " + (_0x242faf + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(1800000), _0x29cd0b);
    await operation(_0x43244a, _0x1f3689);
  } catch (_0x274ebe) {
    let _0x196ea3 = _0x43244a;
    if (_0x274ebe.message) {
      if (_0x274ebe.message.includes("Unauthorized")) {
        _0x196ea3 = await _0x29cd0b.tokenUpdate();
      } else {
        await Helper.delay(0x2710, _0x43244a, "Error : " + _0x274ebe.message + ", Retry again after 10 Second", _0x29cd0b);
      }
    } else {
      await Helper.delay(0x2710, _0x43244a, "Error :" + JSON.stringify(_0x274ebe) + ", Retry again after 10 Second", _0x29cd0b);
    }
    await operation(_0x196ea3, _0x1f3689);
  }
}
async function startBot() {
  return new Promise(async (_0x2b7de3, _0x59aade) => {
    try {
      a0_0x2be55c.info("BOT STARTED");
      if (accountLists.length == 0x0) {
        throw Error("Please input your account first on accounts.js file");
      }
      if (proxyList.length != accountLists.length && proxyList.length != 0x0) {
        throw Error("You Have " + accountLists.length + " Accounts But Provide " + proxyList.length);
      }
      const _0x30b6f5 = [];
      for (const _0x1aaf14 of accountLists) {
        const _0x309146 = accountLists.indexOf(_0x1aaf14);
        const _0x15f6ff = proxyList[_0x309146];
        a0_0x30e31d.firstOrCreateUserData(_0x1aaf14.pk, _0x1aaf14.refreshToken);
        _0x30b6f5.push(operation(_0x1aaf14, _0x15f6ff));
      }
      await Promise.all(_0x30b6f5);
      _0x2b7de3();
    } catch (_0x195d38) {
      a0_0x2be55c.info("BOT STOPPED");
      a0_0x2be55c.error(JSON.stringify(_0x195d38));
      _0x59aade(_0x195d38);
    }
  });
}
(async () => {
  try {
    a0_0x2be55c.clear();
    a0_0x2be55c.info('');
    a0_0x2be55c.info("Application Started");
    console.log("HANAFUDA TESTNET BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x4a9064) {
    console.log("Error During executing bot", _0x4a9064);
    await startBot();
  }
})();
