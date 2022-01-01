import { Request, Response } from "express";

const updateUserHandler = async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "age", "email", "password"];
  const isValidOperation = updates.every(u => allowedUpdates.includes(u));
  if (!isValidOperation)
    return res.status(400).send({
      error: "Invalid update field",
    });

  const { user } = req;
  try {
    if (user) {
      updates.forEach(update => (user[update] = req.body[update]));
      await user.save();
      res.send(user);
    }
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return res.status(400).send(err);
    }
    res.status(500).send();
  }
};

export default updateUserHandler;
