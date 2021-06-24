#!/usr/bin/node
const fs = require('fs');
const KP = require('bittorrent-dht-store-keypair');
const DHT = require('bittorrent-dht');

const dht = new DHT({verify: KP.verify});
const kp = KP(require('./keys.json'));
const data = require('./data.json');

kp.seq = 0;

dht.once('ready', function () {
    let kps = kp.store(JSON.stringify(data));
    dht.put(kps, function (errors, hash) {
        if (errors && errors.length) {
            errors.forEach(console.log);
        } else if (process.argv[2]) {
            console.log(hash.toString('hex'));
        }
        process.exit(0);
    });
});
