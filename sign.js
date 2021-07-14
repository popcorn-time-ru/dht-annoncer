#!/usr/bin/node
const fs = require('fs');
const KP = require('bittorrent-dht-store-keypair');
const DHT = require('bittorrent-dht');
const ed = require('ed25519-supercop')
const bencode = require('bencode')

const kp = KP(require('./keys.json'));
const data = require('./data.json');

function encodeData (msg) {
  const ref = { seq: msg.seq || 0, v: msg.v }
  if (msg.salt) ref.salt = msg.salt
  return bencode.encode(ref).slice(1, -1)
}

kp.seq=0;
console.log('Sign');
console.log(data);
console.log('Seq: '+kp.seq);

let kps = kp.store(JSON.stringify(data));

kps.sig = kps.sign(encodeData(kps));
delete kps.sign;

fs.writeFile('./sign.json', JSON.stringify({
    k: kps.k.toString('hex'),
    seq: kps.seq,
    salt: kps.salt,
    v: kps.v.toString(),
    sig: kps.sig.toString('hex'),
}, null, 4), function() {
});
