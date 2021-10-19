"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _multer = _interopRequireDefault(require("multer"));

var _gallery = _interopRequireDefault(require("../services/gallery.service"));

var cloudinary = require("cloudinary").v2;

var _require = require("multer-storage-cloudinary"),
    CloudinaryStorage = _require.CloudinaryStorage;

cloudinary.config({
  cloud_name: "goran",
  api_key: "347353919781489",
  api_secret: "9zIoxCx6DNflw27IuzgWk84lzK0"
});
var storage = new CloudinaryStorage({
  cloudinary: cloudinary
});
var upload = (0, _multer["default"])({
  storage: storage
});
exports.upload = upload;
var params = {
  folder: "Gallery",
  allowedFormats: ["jpg", "png", "gif"],
  transformation: [{
    width: 400,
    height: 400,
    crop: "limit"
  }]
};

var GalleryController = /*#__PURE__*/function () {
  function GalleryController() {
    (0, _classCallCheck2["default"])(this, GalleryController);
    (0, _defineProperty2["default"])(this, "create", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var image, photo, obj;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return cloudinary.uploader.upload(req.file.path, params);

              case 3:
                image = _context.sent;

                if (image) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(401).json(error.message));

              case 6:
                photo = {
                  id: req.body.id,
                  image: image.url,
                  categories: req.body.categories,
                  cloudinary_id: image.public_id
                }; //cloudinary.v2.uploader.destroy(public_id, options, callback);

                _context.next = 9;
                return _gallery["default"].addImage(photo);

              case 9:
                obj = _context.sent;
                return _context.abrupt("return", res.json(obj));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json(_context.t0.message));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 13]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  (0, _createClass2["default"])(GalleryController, [{
    key: "getImages",
    value: // Get by id
    function () {
      var _getImages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var obj;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _gallery["default"].getImages(req.params.id);

              case 3:
                obj = _context2.sent;

                if (!obj) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", res.status(200).json(obj));

              case 8:
                return _context2.abrupt("return", res.status(400).json({
                  error: "Images not found"
                }));

              case 9:
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  error: "Images not found"
                }));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      function getImages(_x3, _x4) {
        return _getImages.apply(this, arguments);
      }

      return getImages;
    }() //delete Imaage

  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var image, obj, delet;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                image = req.params;
                _context3.next = 4;
                return _gallery["default"].imageId({
                  _id: image.id
                });

              case 4:
                obj = _context3.sent;
                _context3.next = 7;
                return cloudinary.uploader.destroy({
                  cloudinary_id: obj.cloudinary_id
                });

              case 7:
                _context3.next = 9;
                return _gallery["default"]["delete"]({
                  _id: image.id
                });

              case 9:
                delet = _context3.sent;
                return _context3.abrupt("return", res.json({
                  success: true,
                  msg: "Image is Deleted successfully."
                }));

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(400).json({
                  success: false,
                  msg: "Image does not exist!"
                }));

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 13]]);
      }));

      function _delete(_x5, _x6) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return GalleryController;
}();

var _default = new GalleryController();

exports["default"] = _default;