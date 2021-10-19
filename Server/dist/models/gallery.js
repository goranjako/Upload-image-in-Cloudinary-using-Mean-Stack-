"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var GallerySchema = new Schema({
  id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  categories: {
    type: String,
    required: true
  },
  cloudinary_id: {
    type: String
  }
});
module.exports = _mongoose["default"].model('Gallery', GallerySchema);