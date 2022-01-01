import { Request, Response } from "express";

const readUserHandler = async (req: Request, res: Response) => {
  const { user } = req;
  res.send(user);
};

export default readUserHandler;
