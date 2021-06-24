#!/usr/bin/node
const fs = require('fs');
const KP = require('bittorrent-dht-store-keypair');
const kp = KP()
fs.writeFile('./keys.json', JSON.stringify({
    publicKey: kp.publicKey.toString('hex'),
    secretKey: kp.secretKey.toString('hex')
}, null, 4), function() {
});
