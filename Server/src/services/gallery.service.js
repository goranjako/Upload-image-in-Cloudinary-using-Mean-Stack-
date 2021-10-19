import Gallery from "../models/gallery";

class GalleryService {


 static async addImage(data) {
    try {
      const image = new Gallery(data);
      return await image.save();
    } catch (error) {
      throw error;
    }
  }

   //getById service
   static async getImages(id) {
    try {
      const images = await Gallery.find({ id:id });
      return images;
    } catch (error) {
      throw error;
    }
  }
  static async imageId(id) {
    try {
      const images = await Gallery.findById(id);
      return images;
    } catch (error) {
      throw error;
    }
  }


  static async delete(id) {
    try {
      return await Gallery.deleteOne(id);
    } catch (error) {
      throw error;
    }
  }



}
  export default GalleryService;