import { Request, Response } from "express";

const logoutUserHandler = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    if (user) {
      user.tokens = user.tokens.filter(
        (token: { token: string }) => token.token !== req.token
      );
      await user.save();
      res.send();
    }
  } catch (err) {
    res.status(500).send();
  }
};

export default logoutUserHandler;
