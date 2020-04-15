forwarded

NPM Version NPM Downloads Node.js Version Build Status Test Coverage

Parse HTTP X-Forwarded-For header
Installation

This is a Node.js module available through the npm registry. Installation is done using the npm install command:

$ npm install forwarded

API

var forwarded = require('forwarded')

forwarded(req)

var addresses = forwarded(req)

Parse the X-Forwarded-For header from the request. Returns an array of the addresses, including the socket address for the req, in reverse order (i.e. index 0 is the socket address and the last index is the furthest address, typically the end-user).
Testing

$ npm test

License

MIT