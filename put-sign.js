#!/usr/bin/node
const fs = require('fs');
const KP = require('bittorrent-dht-store-keypair');
const DHT = require('bittorrent-dht');

const dht = new DHT({verify: KP.verify});
const data = require('./sign.json');

data.k = Buffer.from(data.k, 'hex');
data.v = Buffer.from(data.v);
data.sig = Buffer.from(data.sig, 'hex');

dht.once('ready', function () {
    dht.put(data, function (errors, hash) {
        if (errors && errors.length) {
            errors.forEach(console.log);
        } else if (process.argv[2]) {
            console.log(hash.toString('hex'));
        }
        process.exit(0);
    });
});
