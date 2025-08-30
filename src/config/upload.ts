import multer from 'multer';

class UploadConfig {
  getStorage() {
    return multer.diskStorage({
      destination: function (_req, _file, cb) {
        cb(null, __dirname + '/../uploads');
      },

      filename: function (_req, file, cb) {
        const type = file.originalname.split('.')[1];
        const name = file.originalname.split('.')[0];
        cb(null, `${name}-${Date.now()}.${type}`);
      },
    });
  }
}

export default multer({
  storage: new UploadConfig().getStorage(),
  limits: {
    fieldSize: 25 * 1024 * 1024,
  },
});
