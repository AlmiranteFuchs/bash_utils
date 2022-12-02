// Simple exemple node server

// Dependencies
var http = require('http');
var url = require('url');
var qs = require('querystring');

// The server should respond to all requests with a string
var server = http.createServer(function (req, res) {
    // on message route
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    var queryStringObject = parsedUrl.query;
    var method = req.method.toLowerCase();
    var headers = req.headers;

    // Send the response on message route
    res.end('Hello World\n');

    // Get post data
    if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        req.on('end', function () {
            var post = qs.parse(body);

            // Get key of object
            var key = Object.keys(post)[0];
            console.log(key);

            // Add data in file
            var fs = require('fs');
            fs.appendFile('data.txt', key + '\n', function (err) {
                if (err) throw err;
            });
        });
    }
});

// Start the server, and have it listen on port 3000
server.listen(8080, function () {
    console.log("The server is listening on port 8080 now");
});

// Path: index.js
// Simple exemple node server
