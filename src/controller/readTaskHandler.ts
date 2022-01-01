import { Request, Response } from "express";
import Task from "../model/task.model";

const readTaskHandler = async (req: Request, res: Response) => {
  const { user } = req;
  const _id = req.params.taskId;
  try {
    const task = await Task.findOne({ _id, owner: user?._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
};

export default readTaskHandler;
