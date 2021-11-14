const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
import multer from "multer";
import GalleryService from "../services/gallery.service";

cloudinary.config({
  cloud_name: "goran",
  api_key: "347353919781489",
  api_secret: "9zIoxCx6DNflw27IuzgWk84lzK0",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

export const upload = multer({ storage: storage });

const params = {
  folder: "Gallery",
  allowedFormats: ["jpg", "png", "gif"],
  transformation: [{ width: 400, height: 400, crop: "limit" }],
};

class GalleryController {
  create = async (req, res) => {
    try {
      const image = await cloudinary.uploader.upload(req.file.path, params);

      if (!image) {
        return res.status(401).json(error.message);
      }
      const photo = {
        id: req.body.id,
        image: image.url,
        title: req.body.title,
        cloudinary_id: image.public_id,
      };
      //cloudinary.v2.uploader.destroy(public_id, options, callback);
      const obj = await GalleryService.addImage(photo);
      return res.json(obj);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };

  // Get by id
  async getImages(req, res) {
    try {
      const obj = await GalleryService.getImages(req.params.id);
      if (obj) {
        return res.status(200).json(obj);
      } else {
        return res.status(400).json({ error: "Images not found" });
      }
    } catch (err) {
      return res.status(400).json({ error: "Images not found" });
    }
  }
  //delete Imaage
  async delete(req, res) {
    try {
      const image = req.params;
      const obj = await GalleryService.imageId({ _id: image.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy({ cloudinary_id: obj.cloudinary_id });
      const delet = await GalleryService.delete({ _id: image.id });
      return res.json({
        success: true,
        msg: "Image is Deleted successfully.",
      });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, msg: "Image does not exist!" });
    }
  }
}
export default new GalleryController();
