import { Request, Response } from "express";
import User from "../model/user.model";

const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
};

export default loginUserHandler;
