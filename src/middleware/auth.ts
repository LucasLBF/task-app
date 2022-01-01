import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../model/user.model";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY as string
      ) as JwtPayload;
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });
      if (!user) throw new Error();
      req.token = token;
      req.user = user;
      next();
    } else throw new Error();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

export default auth;
