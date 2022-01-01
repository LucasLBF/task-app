import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) => {
    if (!file.originalname.match(/.*\.(jpg|png|jpeg)$/g)) {
      callback(new Error("Please upload an image"));
    }
    callback(null, true);
  },
});

export default upload.single("avatar");
