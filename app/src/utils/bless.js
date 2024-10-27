import a7_0x404a03 from 'blessed';
import a7_0x36bc60 from './logger.js';
import a7_0x1afa43 from '../core/core.js';
import { Helper } from './helper.js';
import { accountLists } from '../../accounts/accounts.js';
import { Config } from '../../config/config.js';
import a7_0xd7abab from '../core/db/sqlite.js';
export class Bless {
  constructor() {
    this.screen = a7_0x404a03.screen({
      'smartCSR': true
    });
    this.screen.title = "AirdropInsiderID";
    this.titleBox = a7_0x404a03.box({
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
    this.subTitle = a7_0x404a03.box({
      'top': 0x1,
      'left': 'center',
      'width': 'shrink',
      'height': 0x2,
      'tags': true,
      'content': "By: AirdropInsiderID (https://t.me/AirdropInsiderID)",
      'style': {
        'fg': "white",
        'bold': true
      }
    });
    this.screen.append(this.subTitle);
    this.tabList = a7_0x404a03.box({
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
    this.hintBox = a7_0x404a03.box({
      'bottom': 0x0,
      'left': 'center',
      'width': '100%',
      'height': 0x3,
      'tags': true,
      'content': "{center}Use '->'(arrow right) and '<-'(arrow left) to switch between tabs{/center}",
      'style': {
        'fg': 'white'
      }
    });
    this.screen.append(this.hintBox);
    this.infoBox = a7_0x404a03.box({
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
    accountLists.forEach((_0x3d3cdc, _0x3215c8) => {
      const _0x579454 = this.createAccountTab("Account " + (_0x3215c8 + 0x1));
      this.tabs.push(_0x579454);
      this.screen.append(_0x579454);
      _0x579454.hide();
    });
    if (this.tabs.length > 0x0) {
      this.tabs[0x0].show();
    }
    this.renderTabList();
    this.screen.key(['q', 'C-c'], () => {
      return process.exit(0x0);
    });
    this.screen.key(['left', 'right'], (_0x427e6d, _0x1d3141) => {
      if (_0x1d3141.name === 'right') {
        this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
      } else if (_0x1d3141.name === "left") {
        this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
      }
    });
    this.screen.render();
  }
  ['createAccountTab'](_0x83be66) {
    return a7_0x404a03.box({
      'label': _0x83be66,
      'top': 0x6,
      'left': 0x0,
      'width': '100%',
      'height': 'shrink',
      'border': {
        'type': 'line'
      },
      'style': {
        'fg': "white",
        'border': {
          'fg': '#f0f0f0'
        }
      },
      'tags': true
    });
  }
  ['renderTabList']() {
    let _0x4dae28 = '';
    accountLists.forEach((_0x1238c4, _0x55c0a0) => {
      if (_0x55c0a0 === this.currentTabIndex) {
        _0x4dae28 += "{blue-fg}{bold} Account " + (_0x55c0a0 + 0x1) + " {/bold}{/blue-fg} ";
      } else {
        _0x4dae28 += " Account " + (_0x55c0a0 + 0x1) + " ";
      }
    });
    this.tabList.setContent('{center}' + _0x4dae28 + '{/center}');
    this.screen.render();
  }
  ["switchTab"](_0x14f8c5) {
    this.tabs[this.currentTabIndex].hide();
    this.currentTabIndex = _0x14f8c5;
    this.tabs[this.currentTabIndex].show();
    this.renderTabList();
    this.screen.render();
  }
  async ['log'](_0x19d97e = '', _0x368c44 = '', _0x33b6e8 = new a7_0x1afa43(), _0x556868) {
    const _0x473e98 = accountLists.find(_0x245efa => _0x245efa.pk == _0x368c44.pk);
    const _0x4110ee = accountLists.indexOf(_0x473e98);
    if (_0x556868 === undefined) {
      a7_0x36bc60.info("Account " + (_0x4110ee + 0x1) + " - " + _0x19d97e);
      _0x556868 = '-';
    }
    let _0x490b6f;
    const _0x5d0c67 = _0x33b6e8.user ?? {};
    const _0x37e791 = _0x5d0c67.name ?? '-';
    const _0x2c3e90 = _0x5d0c67.totalPoint ?? '-';
    const _0x50bab3 = _0x5d0c67.depositCount ?? '-';
    const _0x433da4 = _0x5d0c67.evmAddress ?? {};
    const _0x2170ef = _0x433da4.address ?? '-';
    const _0xa2a542 = _0x33b6e8.garden ?? {};
    const _0x576c02 = _0xa2a542.gardenStatus ?? {};
    const _0x5cb9da = _0x576c02.growActionCount ?? '?';
    const _0x50b323 = _0x576c02.gardenRewardActionCount ?? '?';
    let _0x28dcb3 = {
      'msg': _0x19d97e,
      'delay': _0x556868,
      'name': _0x37e791,
      'point': _0x2c3e90,
      'address': _0x2170ef,
      'depo': _0x50bab3,
      'grow': _0x5cb9da,
      'gardenReward': _0x50b323
    };
    const _0x21a583 = Config.USEDEPOSIT ?? false;
    if (_0x21a583) {
      const _0x316a0a = _0x33b6e8.balance ?? '-';
      const _0x16d31a = _0x33b6e8.address ?? '-';
      const _0x43b5b5 = (await a7_0xd7abab.getTodayDepositLog(_0x16d31a)).length;
      _0x28dcb3 = {
        ..._0x28dcb3,
        'balance': _0x316a0a,
        'address': _0x16d31a,
        'depoToday': _0x43b5b5
      };
      _0x490b6f = '' + Helper.spinnerContent(true, _0x28dcb3);
    } else {
      _0x490b6f = '' + Helper.spinnerContent(false, _0x28dcb3);
    }
    this.tabs[_0x4110ee].setContent(_0x490b6f);
    this.screen.render();
  }
  ["info"](_0x4fbad3 = '') {
    const _0x3d6a8f = "\n{center}Info: " + _0x4fbad3 + "{/center}\n";
    this.infoBox.setContent(_0x3d6a8f);
    this.screen.render();
  }
  ['clearInfo']() {
    this.infoBox.setContent('');
    this.screen.render();
  }
}