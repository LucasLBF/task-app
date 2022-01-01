import { Request, Response } from "express";

const deleteAvatarHandler = async (req: Request, res: Response) => {
  const { user } = req;
  try {
    if (user) {
      user.avatar = undefined;
      await user.save();
    }
    res.send({ message: "Avatar removed with success" });
  } catch (err) {
    res.status(500).send();
  }
};

export default deleteAvatarHandler;
