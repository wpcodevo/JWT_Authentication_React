import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import sharp from "sharp";
import uuid from "../utils/uuid";

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }
  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadPostImages = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

export const resizePostImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files) return next();

    // resize imageCover
    // @ts-ignore
    if (req.files?.image) {
      const filename = `post-${uuid()}-${Date.now()}.jpeg`;
      req.body.image = filename;
      // @ts-ignore
      await sharp(req.files?.image[0]?.buffer)
        .resize(800, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`${__dirname}/../../public/posts/single/${filename}`);
    }

    // resize images
    // @ts-ignore
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(
        // @ts-ignore
        req?.files?.images.map((file, i) => {
          const filename = `post-${uuid()}-${Date.now()}-${i + 1}.jpeg`;

          req.body.images.push(filename);
          return sharp(file.buffer)
            .resize(800, 450)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`${__dirname}/../../public/posts/multiple/${filename}`);
        })
      );
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
