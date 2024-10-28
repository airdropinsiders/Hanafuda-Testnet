  import { HttpsProxyAgent } from 'https-proxy-agent';
  import a1_0x13a16e from 'node-fetch';
  import { Helper } from '../../utils/helper.js';
  import a1_0x4f3c31 from '../../utils/logger.js';
  export class API {
    constructor(_0xe2fece, _0x40f837) {
      this.url = _0xe2fece;
      this.proxy = _0x40f837;
      this.ua = Helper.randomUserAgent();
    }
    ['generateHeaders'](_0x4fac9d = this.query) {
      const _0x4e0314 = {
        'Accept': "application/json, text/plain, */*",
        'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
        'Content-Type': 'application/json',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Site': "same-site",
        'Sec-Fetch-Mode': 'cors',
        'User-Agent': this.ua
      };
      if (_0x4fac9d) {
        _0x4e0314.Authorization = "Bearer " + (_0x4fac9d.includes("Bearer ") ? _0x4fac9d.replace("Bearer ", '') : _0x4fac9d);
      }
      return _0x4e0314;
    }
    ['replaceSensitiveData'](_0x3f7812) {
      if (this.something) {
        if (typeof this.something === 'string') {
          const _0x404791 = new RegExp(this.something, 'g');
          return _0x3f7812.replace(_0x404791, '?????');
        } else {
          if (Array.isArray(this.something)) {
            this.something.forEach(_0x264a2d => {
              const _0x6bbc0f = new RegExp(_0x264a2d, 'g');
              _0x3f7812 = _0x3f7812.replace(_0x6bbc0f, '?????');
            });
          }
        }
      }
      return _0x3f7812;
    }
    async ['fetch'](_0x227215, _0xe63608, _0x3b47be, _0x139d4b = {}, _0x50d5ae = {}, _0x498f02 = false) {
      const _0x4cc14c = _0x498f02 ? _0x227215 : '' + this.url + _0x227215;
      try {
        const _0x3fd8bb = {
          ...this.generateHeaders(_0x3b47be),
          ..._0x50d5ae
        };
        const _0x504bc7 = {
          'headers': _0x3fd8bb,
          'method': _0xe63608,
          'referer': this.origin + '/'
        };
        a1_0x4f3c31.info(_0xe63608 + " : " + this.replaceSensitiveData(_0x4cc14c) + " " + (this.proxy ? this.proxy : ''));
        for (let _0x288881 in _0x3fd8bb) {
          _0x3fd8bb[_0x288881] = this.replaceSensitiveData(_0x3fd8bb[_0x288881]);
        }
        a1_0x4f3c31.info("Request Header : " + JSON.stringify(_0x3fd8bb));
        if (_0xe63608 !== 'GET') {
          _0x504bc7.body = '' + JSON.stringify(_0x139d4b);
          const _0x5747c4 = this.replaceSensitiveData(_0x504bc7.body);
          a1_0x4f3c31.info("Request Body : " + _0x5747c4);
        }
        if (this.proxy) {
          _0x504bc7.agent = new HttpsProxyAgent(this.proxy, {
            'rejectUnauthorized': false
          });
        }
        const _0x368100 = await a1_0x13a16e(_0x4cc14c, _0x504bc7);
        a1_0x4f3c31.info("Response : " + _0x368100.status + " " + _0x368100.statusText);
        if (_0x368100.ok || _0x368100.status == 0x190 || _0x368100.status == 0x193) {
          const _0x47e3a1 = _0x368100.headers.get('content-type');
          let _0x19a8f6;
          if (_0x47e3a1 && _0x47e3a1.includes('application/json')) {
            _0x19a8f6 = await _0x368100.json();
            _0x19a8f6.status = _0x368100.status;
          } else {
            _0x19a8f6 = {
              'status': _0x368100.status,
              'message': await _0x368100.text()
            };
          }
          if (_0x368100.ok) {
            _0x19a8f6.status = 0xc8;
          }
          let _0x23261f = JSON.stringify(_0x19a8f6);
          _0x23261f = this.replaceSensitiveData(_0x23261f);
          if (_0x23261f.length > 0xc8) {
            _0x23261f = _0x23261f.substring(0x0, 0xc8) + '...';
          }
          a1_0x4f3c31.info("Response Data : " + _0x23261f);
          return _0x19a8f6;
        } else {
          throw _0x368100;
        }
      } catch (_0x57f5e4) {
        if (_0x57f5e4.response.status == 0x194 || _0x57f5e4.response.status == 0x1f7) {
          console.error("Detect API Change Stopping bot");
          throw Error("Detect API Change Stopping bot");
        }
        throw _0x57f5e4;
      }
    }
  }
