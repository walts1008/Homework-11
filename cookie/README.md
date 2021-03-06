cookie

NPM Version NPM Downloads Node.js Version Build Status Test Coverage

Basic HTTP cookie parser and serializer for HTTP servers.
Installation

$ npm install cookie

API

var cookie = require('cookie');

cookie.parse(str, options)

Parse an HTTP Cookie header string and returning an object of all cookie name-value pairs. The str argument is the string representing a Cookie header value and options is an optional object containing additional parsing options.

var cookies = cookie.parse('foo=bar; equation=E%3Dmc%5E2');
// { foo: 'bar', equation: 'E=mc^2' }

Options

cookie.parse accepts these properties in the options object.
decode

Specifies a function that will be used to decode a cookie's value. Since the value of a cookie has a limited character set (and must be a simple string), this function can be used to decode a previously-encoded cookie value into a JavaScript string or other object.

The default function is the global decodeURIComponent, which will decode any URL-encoded sequences into their byte representations.

note if an error is thrown from this function, the original, non-decoded cookie value will be returned as the cookie's value.
cookie.serialize(name, value, options)

Serialize a cookie name-value pair into a Set-Cookie header string. The name argument is the name for the cookie, the value argument is the value to set the cookie to, and the options argument is an optional object containing additional serialization options.

var setCookie = cookie.serialize('foo', 'bar');
// foo=bar

Options

cookie.serialize accepts these properties in the options object.
domain

Specifies the value for the Domain Set-Cookie attribute. By default, no domain is set, and most clients will consider the cookie to apply to only the current domain.
encode

Specifies a function that will be used to encode a cookie's value. Since value of a cookie has a limited character set (and must be a simple string), this function can be used to encode a value into a string suited for a cookie's value.

The default function is the global encodeURIComponent, which will encode a JavaScript string into UTF-8 byte sequences and then URL-encode any that fall outside of the cookie range.
expires

Specifies the Date object to be the value for the Expires Set-Cookie attribute. By default, no expiration is set, and most clients will consider this a "non-persistent cookie" and will delete it on a condition like exiting a web browser application.

note the cookie storage model specification states that if both expires and maxAge are set, then maxAge takes precedence, but it is possible not all clients by obey this, so if both are set, they should point to the same date and time.
httpOnly

Specifies the boolean value for the HttpOnly Set-Cookie attribute. When truthy, the HttpOnly attribute is set, otherwise it is not. By default, the HttpOnly attribute is not set.

note be careful when setting this to true, as compliant clients will not allow client-side JavaScript to see the cookie in document.cookie.
maxAge

Specifies the number (in seconds) to be the value for the Max-Age Set-Cookie attribute. The given number will be converted to an integer by rounding down. By default, no maximum age is set.

note the cookie storage model specification states that if both expires and maxAge are set, then maxAge takes precedence, but it is possible not all clients by obey this, so if both are set, they should point to the same date and time.
path

Specifies the value for the Path Set-Cookie attribute. By default, the path is considered the "default path".
sameSite

Specifies the boolean or string to be the value for the SameSite Set-Cookie attribute.

    true will set the SameSite attribute to Strict for strict same site enforcement.
    false will not set the SameSite attribute.
    'lax' will set the SameSite attribute to Lax for lax same site enforcement.
    'none' will set the SameSite attribute to None for an explicit cross-site cookie.
    'strict' will set the SameSite attribute to Strict for strict same site enforcement.

More information about the different enforcement levels can be found in the specification.

note This is an attribute that has not yet been fully standardized, and may change in the future. This also means many clients may ignore this attribute until they understand it.
secure

Specifies the boolean value for the Secure Set-Cookie attribute. When truthy, the Secure attribute is set, otherwise it is not. By default, the Secure attribute is not set.

note be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection.
Example

The following example uses this module in conjunction with the Node.js core HTTP server to prompt a user for their name and display it back on future visits.

var cookie = require('cookie');
var escapeHtml = require('escape-html');
var http = require('http');
var url = require('url');

function onRequest(req, res) {
  // Parse the query string
  var query = url.parse(req.url, true, true).query;

  if (query && query.name) {
    // Set a new cookie with the name
    res.setHeader('Set-Cookie', cookie.serialize('name', String(query.name), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }));

    // Redirect back after setting cookie
    res.statusCode = 302;
    res.setHeader('Location', req.headers.referer || '/');
    res.end();
    return;
  }

  // Parse the cookies on the request
  var cookies = cookie.parse(req.headers.cookie || '');

  // Get the visitor name set in the cookie
  var name = cookies.name;

  res.setHeader('Content-Type', 'text/html; charset=UTF-8');

  if (name) {
    res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
  } else {
    res.write('<p>Hello, new visitor!</p>');
  }

  res.write('<form method="GET">');
  res.write('<input placeholder="enter your name" name="name"> <input type="submit" value="Set Name">');
  res.end('</form>');
}

http.createServer(onRequest).listen(3000);

Testing

$ npm test

Benchmark

$ npm run bench

> cookie@0.3.1 bench cookie
> node benchmark/index.js

  http_parser@2.8.0
  node@6.14.2
  v8@5.1.281.111
  uv@1.16.1
  zlib@1.2.11
  ares@1.10.1-DEV
  icu@58.2
  modules@48
  napi@3
  openssl@1.0.2o

> node benchmark/parse.js

  cookie.parse

  6 tests completed.

  simple      x 1,200,691 ops/sec ±1.12% (189 runs sampled)
  decode      x 1,012,994 ops/sec ±0.97% (186 runs sampled)
  unquote     x 1,074,174 ops/sec ±2.43% (186 runs sampled)
  duplicates  x   438,424 ops/sec ±2.17% (184 runs sampled)
  10 cookies  x   147,154 ops/sec ±1.01% (186 runs sampled)
  100 cookies x    14,274 ops/sec ±1.07% (187 runs sampled)

References

    RFC 6265: HTTP State Management Mechanism
    Same-site Cookies

License

MIT