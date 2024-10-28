  import a7_0x3f81ac from 'blessed';
  import a7_0x20984b from './logger.js';
  import a7_0x594440 from '../core/core.js';
  import { Helper } from './helper.js';
  import { accountLists } from '../../accounts/accounts.js';
  import { Config } from '../../config/config.js';
  import a7_0x4eef77 from '../core/db/sqlite.js';
  export class Bless {
    constructor() {
      this.screen = a7_0x3f81ac.screen({
        'smartCSR': true
      });
      this.screen.title = "AirdropInsiderID";
      this.titleBox = a7_0x3f81ac.box({
        'top': 0x0,
        'left': 'center',
        'width': 'shrink',
        'height': 0x2,
        'tags': true,
        'content': "{center}HANAFUDA TESTNET BOT{/center}\n    By: AirdropInsiderID",
        'style': {
          'fg': 'white',
          'bold': true
        }
      });
      this.screen.append(this.titleBox);
      this.subTitle = a7_0x3f81ac.box({
        'top': 0x1,
        'left': "center",
        'width': "shrink",
        'height': 0x2,
        'tags': true,
        'content': "AirdropInsiderID - (https://t.me/AirdropInsiderID)",
        'style': {
          'fg': "white",
          'bold': true
        }
      });
      this.screen.append(this.subTitle);
      this.tabList = a7_0x3f81ac.box({
        'top': 0x5,
        'left': "center",
        'width': '100%',
        'height': 0x3,
        'tags': true,
        'style': {
          'fg': 'white'
        }
      });
      this.screen.append(this.tabList);
      this.hintBox = a7_0x3f81ac.box({
        'bottom': 0x0,
        'left': 'center',
        'width': "100%",
        'height': 0x3,
        'tags': true,
        'content': "{center}Use '->'(arrow right) and '<-'(arrow left) to switch between tabs{/center}",
        'style': {
          'fg': 'white'
        }
      });
      this.screen.append(this.hintBox);
      this.infoBox = a7_0x3f81ac.box({
        'bottom': 0x3,
        'left': 'center',
        'width': '100%',
        'height': 0x3,
        'tags': true,
        'content': '',
        'style': {
          'fg': 'white'
        }
      });
      this.screen.append(this.infoBox);
      this.tabs = [];
      this.currentTabIndex = 0x0;
      accountLists.forEach((_0x1b2ea6, _0xdfe52c) => {
        const _0x494b11 = this.createAccountTab("Account " + (_0xdfe52c + 0x1));
        this.tabs.push(_0x494b11);
        this.screen.append(_0x494b11);
        _0x494b11.hide();
      });
      if (this.tabs.length > 0x0) {
        this.tabs[0x0].show();
      }
      this.renderTabList();
      this.screen.key(['q', 'C-c'], () => {
        return process.exit(0x0);
      });
      this.screen.key(["left", 'right'], (_0x5bb667, _0x1192eb) => {
        if (_0x1192eb.name === "right") {
          this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
        } else if (_0x1192eb.name === 'left') {
          this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
        }
      });
      this.screen.render();
    }
    ['createAccountTab'](_0x548243) {
      return a7_0x3f81ac.box({
        'label': _0x548243,
        'top': 0x6,
        'left': 0x0,
        'width': "100%",
        'height': 'shrink',
        'border': {
          'type': 'line'
        },
        'style': {
          'fg': 'white',
          'border': {
            'fg': '#f0f0f0'
          }
        },
        'tags': true
      });
    }
    ["renderTabList"]() {
      let _0x1db65a = '';
      accountLists.forEach((_0x5e8844, _0x1bfebe) => {
        if (_0x1bfebe === this.currentTabIndex) {
          _0x1db65a += "{blue-fg}{bold} Account " + (_0x1bfebe + 0x1) + " {/bold}{/blue-fg} ";
        } else {
          _0x1db65a += " Account " + (_0x1bfebe + 0x1) + " ";
        }
      });
      this.tabList.setContent('{center}' + _0x1db65a + '{/center}');
      this.screen.render();
    }
    ['switchTab'](_0x1a480e) {
      this.tabs[this.currentTabIndex].hide();
      this.currentTabIndex = _0x1a480e;
      this.tabs[this.currentTabIndex].show();
      this.renderTabList();
      this.screen.render();
    }
    async ['log'](_0x137cfd = '', _0x5a2bae = '', _0x278394 = new a7_0x594440(), _0x327a1b) {
      const _0x33ad8d = accountLists.find(_0xad3eaa => _0xad3eaa.pk == _0x5a2bae.pk);
      const _0x1e4b7c = accountLists.indexOf(_0x33ad8d);
      if (_0x327a1b === undefined) {
        a7_0x20984b.info("Account " + (_0x1e4b7c + 0x1) + " - " + _0x137cfd);
        _0x327a1b = '-';
      }
      let _0x16ecf1;
      const _0x1c3111 = _0x278394.user ?? {};
      const _0x5dbd6f = _0x1c3111.name ?? '-';
      const _0x44bd2d = _0x1c3111.totalPoint ?? '-';
      const _0x22388c = _0x1c3111.depositCount ?? '-';
      const _0x2d3480 = _0x1c3111.evmAddress ?? {};
      const _0x404c4f = _0x2d3480.address ?? '-';
      const _0x244f31 = _0x278394.garden ?? {};
      const _0x4b9276 = _0x244f31.gardenStatus ?? {};
      const _0x5293fb = _0x4b9276.growActionCount ?? '?';
      const _0x202a61 = _0x4b9276.gardenRewardActionCount ?? '?';
      let _0x4e9e99 = {
        'msg': _0x137cfd,
        'delay': _0x327a1b,
        'name': _0x5dbd6f,
        'point': _0x44bd2d,
        'address': _0x404c4f,
        'depo': _0x22388c,
        'grow': _0x5293fb,
        'gardenReward': _0x202a61
      };
      const _0x253171 = Config.USEDEPOSIT ?? false;
      if (_0x253171) {
        const _0x2e926f = _0x278394.balance ?? '-';
        const _0x9c8c7e = _0x278394.address ?? '-';
        const _0x28a87f = (await a7_0x4eef77.getTodayDepositLog(_0x9c8c7e)).length;
        _0x4e9e99 = {
          ..._0x4e9e99,
          'balance': _0x2e926f,
          'address': _0x9c8c7e,
          'depoToday': _0x28a87f
        };
        _0x16ecf1 = '' + Helper.spinnerContent(true, _0x4e9e99);
      } else {
        _0x16ecf1 = '' + Helper.spinnerContent(false, _0x4e9e99);
      }
      this.tabs[_0x1e4b7c].setContent(_0x16ecf1);
      this.screen.render();
    }
    ['info'](_0x4fff36 = '') {
      const _0x1f4b13 = "\n{center}Info: " + _0x4fff36 + "{/center}\n";
      this.infoBox.setContent(_0x1f4b13);
      this.screen.render();
    }
    ['clearInfo']() {
      this.infoBox.setContent('');
      this.screen.render();
    }
  }
