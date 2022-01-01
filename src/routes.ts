import { Express, Request, Response } from "express";
import createUserHandler from "./controller/createUserHandler";
import createTaskHandler from "./controller/createTaskHandler";
import readUserHandler from "./controller/readUserHandler";
import readTasksHandler from "./controller/readTasksHandler";
import readTaskHandler from "./controller/readTaskHandler";
import updateUserHandler from "./controller/updateUserHandler";
import updateTaskHandler from "./controller/updateTaskHandler";
import deleteUserHandler from "./controller/deleteUserHandler";
import deleteTaskHandler from "./controller/deleteTaskHandler";
import loginUserHandler from "./controller/loginUserHandler";
import logoutUserHandler from "./controller/logoutUserHandler";
import logoutAllHandler from "./controller/logoutAllHandler";
import uploadAvatarHandler from "./controller/uploadAvatarHandler";
import deleteAvatarHandler from "./controller/deleteAvatarHandler";
import auth from "./middleware/auth";
import avatarUpload from "./middleware/avatarUpload";
import { uploadErrorCallback } from "./middleware/errorHandlers";
import fetchAvatarHandler from "./controller/fetchAvatarHandler";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.get("/users/me", auth, readUserHandler);
  app.get("/users/:id/avatar", fetchAvatarHandler);
  app.get("/tasks", auth, readTasksHandler);
  app.get("/tasks/:taskId", auth, readTaskHandler);

  app.post("/users", createUserHandler);
  app.post(
    "/users/me/avatar",
    auth,
    avatarUpload,
    uploadAvatarHandler,
    uploadErrorCallback
  );
  app.post("/users/login", loginUserHandler);
  app.post("/users/logout", auth, logoutUserHandler);
  app.post("/users/logoutAll", auth, logoutAllHandler);
  app.post("/tasks", auth, createTaskHandler);

  app.patch("/users/me", auth, updateUserHandler);
  app.patch("/tasks/:taskId", auth, updateTaskHandler);

  app.delete("/users/me", auth, deleteUserHandler);
  app.delete("/users/me/avatar", auth, deleteAvatarHandler);
  app.delete("/tasks/:taskId", auth, deleteTaskHandler);
}
