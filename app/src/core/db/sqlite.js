  import a4_0x1a3a07 from 'sqlite3';
  import { open } from 'sqlite';
  class SQLITE {
    async ['connectToDatabase']() {
      return open({
        'filename': './database.db',
        'driver': a4_0x1a3a07.Database
      });
    }
    async ['createTable']() {
      const _0x5bd633 = await this.connectToDatabase();
      await _0x5bd633.exec("\n      CREATE TABLE IF NOT EXISTS deposit_log (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        address TEXT NOT NULL,\n        last_deposit DATE NOT NULL\n      )\n    ");
      await _0x5bd633.exec("\n      CREATE TABLE IF NOT EXISTS user_data (\n        pk TEXT NOT NULL,\n        token TEXT NULL,\n        refreshToken TEXT NOT NULL\n      )\n    ");
      await _0x5bd633.close();
    }
    async ['insertData'](_0x51c2d6, _0x226765) {
      await this.createTable();
      const _0xcf3a87 = await this.connectToDatabase();
      await _0xcf3a87.run("INSERT INTO deposit_log (address, last_deposit) VALUES (?, ?)", [_0x51c2d6, _0x226765]);
      await _0xcf3a87.close();
    }
    async ["getTodayDepositLog"](_0x52877b) {
      await this.createTable();
      const _0x3428b9 = await this.connectToDatabase();
      const _0x1743e1 = new Date().toISOString().split('T')[0x0];
      const _0xa33781 = await _0x3428b9.all("\n      SELECT * FROM deposit_log\n      WHERE DATE(last_deposit) = ? AND address = ?\n      ORDER BY last_deposit DESC\n    ", [_0x1743e1, _0x52877b]);
      await _0x3428b9.close();
      return _0xa33781;
    }
    async ['firstOrCreateUserData'](_0xd067cf, _0x4b88b4) {
      await this.createTable();
      const _0x43a699 = await this.connectToDatabase();
      const _0x37e397 = await _0x43a699.get("\n        SELECT * FROM user_data\n        WHERE pk = ?\n        ", [_0xd067cf]);
      if (_0x37e397) {
        await _0x43a699.close();
        return _0x37e397;
      }
      await _0x43a699.run("\n        INSERT INTO user_data (pk, refreshToken) VALUES (?, ?)\n        ", [_0xd067cf, _0x4b88b4]);
      const _0x3a08f2 = await _0x43a699.get("\n        SELECT * FROM user_data\n        WHERE pk = ?\n        ", [_0xd067cf]);
      await _0x43a699.close();
      return _0x3a08f2;
    }
    async ['updateUserData'](_0x42fe89, _0x2d59f0, _0xebc57e) {
      await this.createTable();
      const _0x3f38a4 = await this.connectToDatabase();
      const _0x1f727e = await _0x3f38a4.run("\n      UPDATE user_data\n      SET token = ?, refreshToken = ?\n      WHERE pk = ?\n      ", [_0x2d59f0, _0xebc57e, _0x42fe89]);
      await _0x3f38a4.close();
      return _0x1f727e.changes > 0x0;
    }
  }
  const sqlite = new SQLITE();
  await sqlite.createTable();
  export default sqlite;
