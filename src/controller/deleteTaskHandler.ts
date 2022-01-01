import { Request, Response } from "express";
import Task from "../model/task.model";

const deleteTaskHandler = async (req: Request, res: Response) => {
  const _id = req.params.taskId;
  const { user } = req as any;
  try {
    const deletedTask = await Task.findOneAndDelete({ _id, owner: user?._id });
    if (!deletedTask) return res.status(404).send();
    res.send(deletedTask);
  } catch (err) {
    res.status(500).send();
  }
};

export default deleteTaskHandler;
