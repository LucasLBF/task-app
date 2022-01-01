import { model, Schema } from "mongoose";

export interface TaskDocument {
  [key: string]: any;
  description: string;
  completed?: boolean;
  owner: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

TaskSchema.methods.checkOwner = async function (
  candidateOwner: Schema.Types.ObjectId
) {
  const task = this as TaskDocument;
  return task.owner === candidateOwner ? true : false;
};

const Task = model<TaskDocument>("Task", TaskSchema);

export default Task;
