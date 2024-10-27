import a4_0x273901 from 'sqlite3';
import { open } from 'sqlite';
class SQLITE {
  async ["connectToDatabase"]() {
    return open({
      'filename': './database.db',
      'driver': a4_0x273901.Database
    });
  }
  async ['createTable']() {
    const _0x49ce5d = await this.connectToDatabase();
    await _0x49ce5d.exec("\n      CREATE TABLE IF NOT EXISTS deposit_log (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        address TEXT NOT NULL,\n        last_deposit DATE NOT NULL\n      )\n    ");
    await _0x49ce5d.exec("\n      CREATE TABLE IF NOT EXISTS user_data (\n        pk TEXT NOT NULL,\n        token TEXT NULL,\n        refreshToken TEXT NOT NULL\n      )\n    ");
    await _0x49ce5d.close();
  }
  async ['insertData'](_0x43e8ba, _0x672738) {
    await this.createTable();
    const _0x2e4e75 = await this.connectToDatabase();
    await _0x2e4e75.run("INSERT INTO deposit_log (address, last_deposit) VALUES (?, ?)", [_0x43e8ba, _0x672738]);
    await _0x2e4e75.close();
  }
  async ['getTodayDepositLog'](_0x3195e3) {
    await this.createTable();
    const _0x4a3302 = await this.connectToDatabase();
    const _0xf5563f = new Date().toISOString().split('T')[0x0];
    const _0x387e3f = await _0x4a3302.all("\n      SELECT * FROM deposit_log\n      WHERE DATE(last_deposit) = ? AND address = ?\n      ORDER BY last_deposit DESC\n    ", [_0xf5563f, _0x3195e3]);
    await _0x4a3302.close();
    return _0x387e3f;
  }
  async ['firstOrCreateUserData'](_0x40d4bd, _0xde9e6e) {
    await this.createTable();
    const _0x662a9c = await this.connectToDatabase();
    const _0x2f7ec4 = await _0x662a9c.get("\n        SELECT * FROM user_data\n        WHERE pk = ?\n        ", [_0x40d4bd]);
    if (_0x2f7ec4) {
      await _0x662a9c.close();
      return _0x2f7ec4;
    }
    await _0x662a9c.run("\n        INSERT INTO user_data (pk, refreshToken) VALUES (?, ?)\n        ", [_0x40d4bd, _0xde9e6e]);
    const _0x4f797e = await _0x662a9c.get("\n        SELECT * FROM user_data\n        WHERE pk = ?\n        ", [_0x40d4bd]);
    await _0x662a9c.close();
    return _0x4f797e;
  }
  async ["updateUserData"](_0x31193b, _0x506c2d, _0x5e2a6d) {
    await this.createTable();
    const _0x48f0ec = await this.connectToDatabase();
    const _0x2216de = await _0x48f0ec.run("\n      UPDATE user_data\n      SET token = ?, refreshToken = ?\n      WHERE pk = ?\n      ", [_0x506c2d, _0x5e2a6d, _0x31193b]);
    await _0x48f0ec.close();
    return _0x2216de.changes > 0x0;
  }
}
const sqlite = new SQLITE();
await sqlite.createTable();
export default sqlite;