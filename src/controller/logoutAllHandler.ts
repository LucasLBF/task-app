import { Request, Response } from "express";

const logoutAllHandler = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      req.user.tokens = [];
      await req.user.save();
      res.send();
    }
  } catch (err) {
    res.status(500).send();
  }
};

export default logoutAllHandler;
