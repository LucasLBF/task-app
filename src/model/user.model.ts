import { CallbackError, Document, model, Model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Task from "./task.model";

interface PublicProfile {
  _id: string;
  name: string;
  email: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends Document {
  [key: string]: any;
  name: string;
  email: string;
  password: string;
  age?: number;
  tokens: Array<{ token: string }>;
  avatar?: Buffer;
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken: () => string;
  getPublicProfile: () => PublicProfile;
}

export interface UserModel extends Model<UserDocument> {
  findByCredentials(email: string, password: string): Promise<UserDocument>;
}

const UserSchema = new Schema<UserDocument, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
      trim: true,
      validate(value: string) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Your password cannot contain the word 'password'");
        }
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-\/()_.+=]).*$/.test(value)
        ) {
          throw new Error(
            "Your password must contain at least one lowercase, one uppercase and one special character"
          );
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value: number) {
        if (value < 0) {
          throw new Error("Age must be a positive number");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

UserSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this as UserDocument;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.SECRET_KEY as string,
    { expiresIn: "7 days" }
  );
  user.tokens.push({ token });
  await user.save();
  return token;
};

UserSchema.methods.toJSON = function () {
  const user = this as UserDocument;
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    age: user.age,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  } as PublicProfile;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Unable to login");
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Unable to login");
  return user;
};

UserSchema.pre(
  "save",
  async function (next: (err?: CallbackError | undefined) => void) {
    const user = this as UserDocument;
    if (user.isModified("password")) {
      const salt = 8;
      user.password = await bcrypt.hash(user.password, salt);
    }
    next();
  }
);

UserSchema.pre(
  "remove",
  async function (next: (err?: CallbackError | undefined) => void) {
    const user = this as UserDocument;
    await Task.deleteMany({ owner: user._id });
    next();
  }
);

const User = model<UserDocument, UserModel>("User", UserSchema);

export default User;
