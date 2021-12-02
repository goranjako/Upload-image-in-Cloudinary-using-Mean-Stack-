import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}, 
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  cloudinary_id: {
    type: String,
  },


});

module.exports = mongoose.model('Gallery', GallerySchema);