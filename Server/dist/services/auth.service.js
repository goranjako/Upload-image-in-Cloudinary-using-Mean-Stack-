"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _user = _interopRequireDefault(require("../models/user"));

var AuthService = /*#__PURE__*/function () {
  function AuthService() {
    (0, _classCallCheck2["default"])(this, AuthService);
  }

  (0, _createClass2["default"])(AuthService, null, [{
    key: "register",
    value: //reister service
    function () {
      var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var user, obj;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                user = new _user["default"](data);
                _context.next = 4;
                return user.save();

              case 4:
                obj = _context.sent;
                return _context.abrupt("return", obj);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function register(_x) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }]);
  return AuthService;
}();

var _default = AuthService;
exports["default"] = _default;