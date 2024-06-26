import multer from "multer";
import os from "os";
const interfaces = os.networkInterfaces();

class UploadConfig {
  getStorage() {
    return multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, __dirname + "/../uploads");
      },

      filename: function (req, file, cb) {
        const type = file.originalname.split(".")[1];
        const name = file.originalname.split(".")[0];
        cb(null, `${name}-${Date.now()}.${type}`);
      },
    });
  }
}

export default multer({ storage: new UploadConfig().getStorage(), limits:{
  fieldSize: 25 * 1024 * 1024
} });
