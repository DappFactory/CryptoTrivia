# Setting up the client

## Setting up development
1. First make sure we have our local blockchain up and running.
```
ganache-cli -p 7545 -i 8887
```
2. Save the Mnemonic that you get as a result from running the blockchain.
```
HD Wallet
==================
Mnemonic:      <SOME RANDOMLY GENERATED MNEMONIC SHOULD APPEAR HERE>
stamp
Base HD Path:  m/44'/60'/0'/0/{account_index}
```
3. Next deploy our Contract to the block chain by running `./bash.sh`
4. Finally we can run our client `npm run start`

## Configuring Metamask
1. Open up the Metamask chrome extension
2. Click the **Private Network** dropdown on the top left, and choose `http:127.0.0.1:7545`
3. Next select the **Restore from seed phrase** link after log in, and copy over the Mnemonic you saved from step 2.
4. Select a password and then log in

Metamask should now be linked to our local blockchain. I've noticed that the documentation and resources are sometimes a bit behind with the newest version of web3.

Another thing to add, it seems like some properties within the window.web3 object dissapear after we create a new web3 object with the current provider - Metamask.