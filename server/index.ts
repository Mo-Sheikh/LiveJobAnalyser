import { analyseJob } from "../src/entrypoint/analyseJob";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
app.use(bodyParser.text());
app.post("/analyseJob", (req: any, res: any) => {
  analyseJob(req.body);
  res.status = 200;
  res.end();
});
app.get("/", (_req: Request, _res: Response) => {
  console.log("I am live");
});
app.listen(port, () => {
  console.log("Server live");
});
