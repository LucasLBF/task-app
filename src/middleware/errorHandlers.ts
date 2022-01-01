import { Request, Response, NextFunction } from "express";

export const uploadErrorCallback = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).send({ error: err.message });
};
