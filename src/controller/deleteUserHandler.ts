import { Request, Response } from "express";
import { sendCancelationEmail } from "../emails/account";

const deleteUserHandler = async (req: Request, res: Response) => {
  const { user } = req;
  try {
    if (user) {
      await user?.remove();
      sendCancelationEmail(user.email, user.name);
    }

    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
};

export default deleteUserHandler;
