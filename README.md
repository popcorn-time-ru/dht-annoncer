# dht-annoncer

Anonce data to dht by BEP-44 with update

Run `generate.js` to generate privare keys and store `keys.json`

Put data to `data.json`

## Simple annonce

Run `put.js` in cron every hour - `keys.json` and `data.json` must be in same dir

## Secured annonce

Run `sign.js` for build signed file `sign.json`

Run `put-sign.js` in cron every hour - `sign.json` must be in same dir, keys are secured

## Update data

Update `data.json`, then inc seq in `put.js` or `sign.js` and run sign if need

## Show hash

Run `put.js` or `put-sign.js` with any param
