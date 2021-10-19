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

var _auth = _interopRequireDefault(require("../services/auth.service"));

var _user = _interopRequireDefault(require("../models/user"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var jwt = require("jsonwebtoken");

_dotenv["default"].config();

var Auth = /*#__PURE__*/function () {
  function Auth() {
    (0, _classCallCheck2["default"])(this, Auth);
  }

  (0, _createClass2["default"])(Auth, [{
    key: "register",
    value: //register
    function () {
      var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var newUser, user, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!(!req.body.fullName || !req.body.password)) {
                  _context.next = 5;
                  break;
                }

                res.json({
                  success: false,
                  msg: "Please pass username and password."
                });
                _context.next = 11;
                break;

              case 5:
                newUser = {
                  fullName: req.body.fullName,
                  email: req.body.email,
                  password: req.body.password
                };
                _context.next = 8;
                return _auth["default"].register(newUser);

              case 8:
                user = _context.sent;
                token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN, {
                  expiresIn: "1h"
                }); //Send the jwt in the response

                return _context.abrupt("return", res.status(200).send({
                  success: true,
                  msg: "You are successfully register",
                  token: token
                }));

              case 11:
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                res.status(422).json({
                  success: false,
                  msg: "User already exists."
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 13]]);
      }));

      function register(_x, _x2) {
        return _register.apply(this, arguments);
      }

      return register;
    }() //login

  }, {
    key: "login",
    value: function login(req, res) {
      _user["default"].findOne({
        email: req.body.email
      }, function (err, user) {
        if (err) throw err;

        if (!user) {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. User not found."
          });
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN, {
                expiresIn: "10m"
              }); // return the information including token as JSON

              return res.json({
                success: true,
                msg: "Successful login",
                token: token
              });
            } else {
              return res.status(422).send({
                success: false,
                msg: "Authentication failed. Wrong password."
              });
            }
          });
        }
      });
    }
  }]);
  return Auth;
}();

var _default = new Auth();

exports["default"] = _default;