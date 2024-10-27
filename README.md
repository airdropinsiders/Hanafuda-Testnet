# HANAFUDA BOT
Hanafuda Bot is a powerful tool designed for you to automate hanafuda retroactive airdrop.

## BOT FEATURE
- Multi Account 
- Support PK & SEED
- Auto Deposit
- Auto Grow
- Auto Draw Hanafuda (If you have 10 Draw)


## Setup & Configure BOT

### Linux
1. Clone project repo
   ```
   git clone https://github.com/airdropinsiders/Hanafuda-Testnet.git && cd Hanafuda-Testnet
   ```
2. Run
   ```
   npm install && npm run setup
   ```
3. Configure your accounts
   ```
   nano accounts/accounts.js
   ```
4. Configure the bot config
   ```
   nano config/config.js
   ```
5. Configure the proxy
   ```
   nano config/proxy_list.js
   ```
6. Run Bot
   ```
   npm run start
   ```
   
### Windows
1. Open your `Command Prompt` or `Power Shell`.
2. Clone project repo
   ```
   git clone https://github.com/Widiskel/hanafuda-bot.git && cd hanafuda-bot
   ```
3. Run 
   ```
   npm install && npm run setup
   ```
5. Navigate to `Hanafuda-Testnet` directory. 
6. Navigate to `accounts` folder and rename `accounts_tmp.js` to `accounts.js`.
7. Now open `acccounts.js` and setup your accounts. 
8. Now Back to `Hanafuda-Testnet` directory and Navigate to `config` adjust the `config.js` as needed.
9. Also Configure proxy if you want by open `proxy_list.js`.
10. Back to `Hanafuda-Testnet` directory.
11. To start the app open your `Command Prompt` or `Power Shell`
12. Run Bot
    ```
    npm run start
    ```

## Update Bot

To update bot follow this step :
1. run
   ```
   git pull
   ```
   or
   ```
   git pull --rebase
   ```
   if error run
   ```
   git stash && git pull
   ```
2. run
   ```
   npm update
   ```
2. start the bot


## NOTE
DWYOR

the accounts writted with this format
```
[
      {
          refreshToken: "YOUR REFRESH TOKEN",
          pk: "YOUR PRIVATE KEY",
      },
      {
          refreshToken: "YOUR REFRESH TOKEN",
          pk: "YOUR PRIVATE KEY",
      }
]
```
Where you get refresh token ? 
- Open hanafuda website and logout from your account.
- After that open browser developer tool / inspect element
- Go to network Tab
- Try to login again with your google accounts
- Find a XHR/Fetch request with this url `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=`
- Click the request and open the response tab / preview tab
- You will get `refreshToken` from that, copy to the bot accounts
- Make sure you've connect your wallet so your Wallet and Hanafuda account is binded