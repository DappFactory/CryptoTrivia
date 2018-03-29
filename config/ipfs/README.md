# Installation
https://ipfs.io/docs/install/

Follow the link, and run the install shell script. You should now have IPFS working on your computer.

## Initialization

    npm install web3
    ipfs init

We need the ethereum web3 javascript interface package (web3). This will initialize the global local repository, which will give you an initial readme file.

## Connecting Online

    ipfs daemon

This will initiate the daemon background process on one terminal window, which will serve as a gateway link to the IPFS nodes. 

    ipfs add -r <dir>/

This will add our <dir> folder to the network, and can generate a long hash for us that uniquely identifies our folder on the network.

    ipfs name publish <hash>

This will publish that specific hash generated for <dir>, which will give you IPFS access to the <dir> you chose. 

#### Sequence Of Adding/Updating Files
    webpack
    ipfs add -r <dir>/
    ipfs name publish <hash>



