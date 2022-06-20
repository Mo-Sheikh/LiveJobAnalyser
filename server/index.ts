const express = require("express");
const app = express();
const port = 3000;

app.post("/analyseJob", (req: Request, _res: Response) => {
  console.log(req);
});
app.get("/", (_req: Request, _res: Response) => {
  console.log("I am live");
});
app.listen(port, () => {
  console.log("Server live");
});
