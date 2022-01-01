import mongoose from "mongoose";

const connect = (dbUri: string) => {
  mongoose
    .connect(dbUri)
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Error", err));
};

export default connect;
