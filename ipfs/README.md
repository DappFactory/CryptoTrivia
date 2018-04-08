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
    webpack (configurations)
    ipfs add -r <dir>/
    ipfs name publish <hash>

## 3rd Party APIs
1. Since doing all this can be tedious given the various ways to upload data (e.g. files, url, streaming data, etc.), we can rely on a 3rd party API to do most of the abstraction for us.

https://github.com/ipfs/js-ipfs-api

2. Also we can use IPNS to continuously modify pointers to our hashed data.

## Adding Quiz Dataset To IPFS

    ipfs dameon
    ipfs add data/data.csv
    ipfs name publish <hash>

## Checking Quiz Dataset on IPFS

1. Use browser to check uploaded file content on IPFS using following URL
* http://ipfs.io/ipfs/<hash>

## To run unit tests

    npm run test:ipfs
