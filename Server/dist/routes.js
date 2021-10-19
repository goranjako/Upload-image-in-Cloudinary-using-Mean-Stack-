"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setRoutes;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./controllers/auth.controller"));

var _gallery = _interopRequireWildcard(require("./controllers/gallery.controller"));

var _auth2 = _interopRequireDefault(require("./util/auth"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _require = require('./util/validation'),
    validateRegistrationBody = _require.validateRegistrationBody,
    validateLoginBody = _require.validateLoginBody,
    Todovalidate = _require.Todovalidate,
    TodoId = _require.TodoId,
    validate = _require.validate;

function setRoutes(app) {
  var router = _express["default"].Router();

  router.post("/register", validateRegistrationBody(), validate, _auth["default"].register);
  router.post("/login", validateLoginBody(), validate, _auth["default"].login);
  router.route('/image').post(_auth2["default"].verifyToken, _gallery.upload.single('image'), _gallery["default"].create);
  router.route('/image/:id').get(_auth2["default"].verifyToken, _gallery["default"].getImages);
  router.route('/image/:id')["delete"](_auth2["default"].verifyToken, _gallery["default"]["delete"]);
  app.use('/', router);
}