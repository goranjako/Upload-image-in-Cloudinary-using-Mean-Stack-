"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

//const http = require('http');
_dotenv["default"].config();
/**
 * Get port from environment and store in Express.
 */


var port = process.env.port || 3000;

_app["default"].set('port', port);
/**
 * Create HTTP server.
 */


var server = _http["default"].createServer(_app["default"]);

var start = function start() {
  try {
    server.listen(port, function () {
      console.log("Api up and running at: http://localhost:" + port);
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

start();