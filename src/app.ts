import express, { Express } from "express";
import routes from "./routes";
import connect from "./db/connect";

const port = process.env.PORT as string;
const host = process.env.HOST as string;
const dbUri = process.env.DB_URI as string;
const app: Express = express();

app.use(express.json());

app.listen(+port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
  connect(dbUri);
  routes(app);
});
