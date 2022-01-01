import { Request, Response } from "express";
import sharp from "sharp";

const uploadAvatarHandler = async (req: Request, res: Response) => {
  const { user, file } = req;
  const buffer = await sharp(file?.buffer)
    .resize({
      width: 250,
      height: 250,
    })
    .png()
    .toBuffer();
  await user?.update({ avatar: buffer });
  res.send({ message: "Avatar uploaded with success!" });
};

export default uploadAvatarHandler;
