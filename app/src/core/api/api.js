import { HttpsProxyAgent } from 'https-proxy-agent';
import a1_0x4f84d7 from 'node-fetch';
import { Helper } from '../../utils/helper.js';
import a1_0x4b78af from '../../utils/logger.js';
export class API {
  constructor(_0x436d4c, _0xb24879) {
    this.url = _0x436d4c;
    this.proxy = _0xb24879;
    this.ua = Helper.randomUserAgent();
  }
  ['generateHeaders'](_0x28d693 = this.query) {
    const _0x39378d = {
      'Accept': "application/json, text/plain, */*",
      'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
      'Content-Type': 'application/json',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': 'cors',
      'User-Agent': this.ua
    };
    if (_0x28d693) {
      _0x39378d.Authorization = "Bearer " + (_0x28d693.includes("Bearer ") ? _0x28d693.replace("Bearer ", '') : _0x28d693);
    }
    return _0x39378d;
  }
  ["replaceSensitiveData"](_0x2250a1) {
    if (this.something) {
      if (typeof this.something === "string") {
        const _0x4e43f6 = new RegExp(this.something, 'g');
        return _0x2250a1.replace(_0x4e43f6, "?????");
      } else if (Array.isArray(this.something)) {
        this.something.forEach(_0x37e808 => {
          const _0x599ab8 = new RegExp(_0x37e808, 'g');
          _0x2250a1 = _0x2250a1.replace(_0x599ab8, '?????');
        });
      }
    }
    return _0x2250a1;
  }
  async ['fetch'](_0x5c538d, _0xb8328c, _0x310a90, _0x28777e = {}, _0x10f2c7 = {}, _0x2bc06b = false) {
    const _0x5bdd88 = _0x2bc06b ? _0x5c538d : '' + this.url + _0x5c538d;
    try {
      const _0x12388c = {
        ...this.generateHeaders(_0x310a90),
        ..._0x10f2c7
      };
      const _0x3909ca = {
        'headers': _0x12388c,
        'method': _0xb8328c,
        'referer': this.origin + '/'
      };
      a1_0x4b78af.info(_0xb8328c + " : " + this.replaceSensitiveData(_0x5bdd88) + " " + (this.proxy ? this.proxy : ''));
      for (let _0x5c4ed7 in _0x12388c) {
        _0x12388c[_0x5c4ed7] = this.replaceSensitiveData(_0x12388c[_0x5c4ed7]);
      }
      a1_0x4b78af.info("Request Header : " + JSON.stringify(_0x12388c));
      if (_0xb8328c !== 'GET') {
        _0x3909ca.body = '' + JSON.stringify(_0x28777e);
        const _0x209bcd = this.replaceSensitiveData(_0x3909ca.body);
        a1_0x4b78af.info("Request Body : " + _0x209bcd);
      }
      if (this.proxy) {
        _0x3909ca.agent = new HttpsProxyAgent(this.proxy, {
          'rejectUnauthorized': false
        });
      }
      const _0x3aeee5 = await a1_0x4f84d7(_0x5bdd88, _0x3909ca);
      a1_0x4b78af.info("Response : " + _0x3aeee5.status + " " + _0x3aeee5.statusText);
      if (_0x3aeee5.ok || _0x3aeee5.status == 0x190 || _0x3aeee5.status == 0x193) {
        const _0xeb3e1c = _0x3aeee5.headers.get('content-type');
        let _0x4afa32;
        if (_0xeb3e1c && _0xeb3e1c.includes('application/json')) {
          _0x4afa32 = await _0x3aeee5.json();
          _0x4afa32.status = _0x3aeee5.status;
        } else {
          _0x4afa32 = {
            'status': _0x3aeee5.status,
            'message': await _0x3aeee5.text()
          };
        }
        if (_0x3aeee5.ok) {
          _0x4afa32.status = 0xc8;
        }
        let _0x5b42dd = JSON.stringify(_0x4afa32);
        _0x5b42dd = this.replaceSensitiveData(_0x5b42dd);
        if (_0x5b42dd.length > 0xc8) {
          _0x5b42dd = _0x5b42dd.substring(0x0, 0xc8) + '...';
        }
        a1_0x4b78af.info("Response Data : " + _0x5b42dd);
        return _0x4afa32;
      } else {
        throw _0x3aeee5;
      }
    } catch (_0x29c756) {
      if (_0x29c756.response.status == 0x194 || _0x29c756.response.status == 0x1f7) {
        console.error("Detect API Change Stopping bot");
        throw Error("Detect API Change Stopping bot");
      }
      throw _0x29c756;
    }
  }
}