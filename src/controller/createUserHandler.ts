import { Request, Response } from "express";
import User from "../model/user.model";
import { sendWelcomeEmail } from "../emails/account";

const createUserHandler = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    const token = await newUser.generateAuthToken();
    sendWelcomeEmail(newUser.email, newUser.name);
    res.status(201).send({ newUser, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

export default createUserHandler;
