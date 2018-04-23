# Setting up the client

## Setting up development blockchain
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
3. Next deploy our Contract to the block chain by running `./run.sh`
4. Finally we can run our client `npm run start`

## Configuring Metamask
1. Open up the Metamask chrome extension
2. Click the **Network** dropdown on the top left, choose **Custom RPC**, and enter `http://127.0.0.1:7545` as the new RPC URL.
* This step only needs to be completed the first time deploying a blockchain to a new address.
* If you have already set up the blockchain to an address before, the connection will appear as **Private Network**.
3. Next select the **Restore from seed phrase** link after log in, and copy over the Mnemonic you saved from step 2 of setting up the development blockchain.
4. Select a password and then log in.

Metamask should now be linked to our local blockchain. I've noticed that the documentation and resources are sometimes a bit behind with the newest version of web3.

Another thing to add, it seems like some properties within the window.web3 object dissapear after we create a new web3 object with the current provider - Metamask.

Resource:
http://truffleframework.com/docs/advanced/truffle-with-metamask
