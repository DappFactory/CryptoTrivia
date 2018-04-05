// Config
var ipfsHost 	= 'localhost',
	ipfsAPIPort = '4001',
	ipfsWebPort = '8080',
	web3Host 	= 'http://',
	web3Port 	= '8545';

// IPFS
var ipfs = window.IpfsApi(ipfsHost, ipfsAPIPort)
ipfs.swarm.peers(function(err, response) { // get the peers on our ipfs network
    if (err) {
        console.error(err);
    } else {
        console.log("IPFS - connected to " + response.Strings.length + " peers");
        console.log(response);
    }
});

// web3
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(web3Host + ':' + web3Port));
if (!web3.isConnected()) { 		// check for connections to the RPC test net
    console.error("Ethereum - no conection to RPC server");
} else {
    console.log("Ethereum - connected to RPC server");
}