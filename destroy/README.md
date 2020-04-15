Destroy

NPM version Build status Test coverage License Downloads Gittip

Destroy a stream.

This module is meant to ensure a stream gets destroyed, handling different APIs and Node.js bugs.
API

var destroy = require('destroy')

destroy(stream)

Destroy the given stream. In most cases, this is identical to a simple stream.destroy() call. The rules are as follows for a given stream:

    If the stream is an instance of ReadStream, then call stream.destroy() and add a listener to the open event to call stream.close() if it is fired. This is for a Node.js bug that will leak a file descriptor if .destroy() is called before open.
    If the stream is not an instance of Stream, then nothing happens.
    If the stream has a .destroy() method, then call it.

The function returns the stream passed in as the argument.
Example

var destroy = require('destroy')

var fs = require('fs')
var stream = fs.createReadStream('package.json')

// ... and later
destroy(stream)