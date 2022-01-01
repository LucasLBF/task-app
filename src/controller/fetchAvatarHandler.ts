import { Request, Response } from "express";
import User from "../model/user.model";

const fetchAvatarHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });
    if (!user || !user.avatar) return res.status(404).send();
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export default fetchAvatarHandler;
