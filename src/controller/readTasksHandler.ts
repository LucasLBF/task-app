import { Request, Response } from "express";
import parseReadQueries from "../utils/parseReadQueries";

export interface QueryObj {
  [key: string]: string | undefined;
  completed?: string;
  description?: string;
  limit?: string;
  skip?: string;
  sortBy?: string;
}

const readTasksHandler = async (req: Request, res: Response) => {
  const { user, query } = req;
  try {
    const { match, options } = parseReadQueries(query as QueryObj);
    if (user) {
      await user.populate({
        path: "tasks",
        match,
        options,
      });
      const tasks = user.tasks;
      res.send(tasks);
    }
  } catch (err) {
    res.status(500).send();
  }
};

export default readTasksHandler;
