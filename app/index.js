  import { accountLists } from './accounts/accounts.js';
  import { Config } from './config/config.js';
  import { proxyList } from './config/proxy_list.js';
  import a0_0x2a80a3 from './src/core/core.js';
  import a0_0x14e14f from './src/core/db/sqlite.js';
  import { Helper } from './src/utils/helper.js';
  import a0_0x20f82c from './src/utils/logger.js';
  async function operation(_0x23cb69, _0xb7c44b) {
    const _0xbcd7da = new a0_0x2a80a3(_0x23cb69, _0xb7c44b);
    try {
      await _0xbcd7da.getUserInfo(true);
      await _0xbcd7da.getGardenInfo(true);
      await a0_0x14e14f.createTable();
      const _0x23f23e = Config.USEDEPOSIT ?? false;
      if (_0x23f23e) {
        await _0xbcd7da.connectWallet();
        await _0xbcd7da.getBalance();
        if (Number(_0xbcd7da.balance) > Number(0.0001)) {
          let _0x167a58 = await a0_0x14e14f.getTodayDepositLog(_0xbcd7da.address);
          const _0x18ebd7 = Config.DAILYDEPOSITCOUNT ?? 0x1;
          while (_0x167a58.length < _0x18ebd7) {
            await _0xbcd7da.deposit();
            _0x167a58 = await a0_0x14e14f.getTodayDepositLog(_0xbcd7da.address);
          }
        } else {
          await Helper.delay(0x1388, _0x23cb69, "Balance insufficient to use Deposit, Minimum Balance is 0.0001", _0xbcd7da);
        }
      }
      let _0xf7d9ee = _0xbcd7da.garden.gardenStatus.growActionCount;
      while (_0xf7d9ee != 0x0) {
        await _0xbcd7da.startGrowAction();
        _0xf7d9ee -= 0x1;
      }
      await _0xbcd7da.getGardenInfo(true);
      await _0xbcd7da.getUserInfo(true);
      while (_0xbcd7da.garden.gardenStatus.gardenRewardActionCount >= 0xa) {
        await _0xbcd7da.drawHanafuda();
      }
      const _0x37f5ba = accountLists.find(_0x3e28e4 => _0x3e28e4.pk == _0x23cb69.pk);
      const _0x15712b = accountLists.indexOf(_0x37f5ba);
      await Helper.delay(1800000, _0x23cb69, "Account " + (_0x15712b + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(1800000), _0xbcd7da);
      await operation(_0x23cb69, _0xb7c44b);
    } catch (_0x3cad49) {
      let _0x9be416 = _0x23cb69;
      if (_0x3cad49.message) {
        if (_0x3cad49.message.includes("Unauthorized")) {
          _0x9be416 = await _0xbcd7da.tokenUpdate();
        } else {
          await Helper.delay(0x2710, _0x23cb69, "Error : " + _0x3cad49.message + ", Retry again after 10 Second", _0xbcd7da);
        }
      } else {
        await Helper.delay(0x2710, _0x23cb69, "Error :" + JSON.stringify(_0x3cad49) + ", Retry again after 10 Second", _0xbcd7da);
      }
      await operation(_0x9be416, _0xb7c44b);
    }
  }
  async function startBot() {
    return new Promise(async (_0x48ef28, _0x31d789) => {
      try {
        a0_0x20f82c.info("BOT STARTED");
        if (accountLists.length == 0x0) {
          throw Error("Please input your account first on accounts.js file");
        }
        if (proxyList.length != accountLists.length && proxyList.length != 0x0) {
          throw Error("You Have " + accountLists.length + " Accounts But Provide " + proxyList.length);
        }
        const _0x4bc2ca = [];
        for (const _0x380e89 of accountLists) {
          const _0x215dcf = accountLists.indexOf(_0x380e89);
          const _0x3a4365 = proxyList[_0x215dcf];
          a0_0x14e14f.firstOrCreateUserData(_0x380e89.pk, _0x380e89.refreshToken);
          _0x4bc2ca.push(operation(_0x380e89, _0x3a4365));
        }
        await Promise.all(_0x4bc2ca);
        _0x48ef28();
      } catch (_0xae5b32) {
        a0_0x20f82c.info("BOT STOPPED");
        a0_0x20f82c.error(JSON.stringify(_0xae5b32));
        _0x31d789(_0xae5b32);
      }
    });
  }
  (async () => {
    try {
      a0_0x20f82c.clear();
      a0_0x20f82c.info('');
      a0_0x20f82c.info("Application Started");
      console.log("HANAFUDA TESTNET BOT");
      console.log();
      console.log("Join Channel : https://t.me/AirdropInsiderID");
      console.log("Dont forget to run git pull to keep up to date");
      console.log();
      console.log();
      Helper.showSkelLogo();
      await startBot();
    } catch (_0x18bc86) {
      console.log("Error During executing bot", _0x18bc86);
      await startBot();
    }
  })();
