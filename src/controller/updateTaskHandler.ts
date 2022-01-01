import { Request, Response } from "express";
import Task from "../model/task.model";

const updateTaskHandler = async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(u => allowedUpdates.includes(u));
  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid update field",
    });
  }
  const { user } = req;
  const _id = req.params.taskId;
  try {
    const updatedTask = await Task.findOne({ _id, owner: user?._id });
    if (!updatedTask) return res.status(404).send();
    updates.forEach(u => (updatedTask[u] = req.body[u]));
    await updatedTask.save();
    res.send(updatedTask);
  } catch (err) {
    res.status(500).send();
  }
};

export default updateTaskHandler;
