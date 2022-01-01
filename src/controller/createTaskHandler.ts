import { Request, Response } from "express";
import Task from "../model/task.model";

const createTaskHandler = async (req: Request, res: Response) => {
  const { user } = req;
  try {
    const newTask = await Task.create({ ...req.body, owner: user?._id });
    res.status(201).send(newTask);
  } catch (err) {
    res.status(400).send(err);
  }
};

export default createTaskHandler;
