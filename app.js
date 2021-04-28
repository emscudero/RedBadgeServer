require("dotenv").config();
let express = require("express");

let app = express();
let db = require("./db");

let user = require("./controllers/usercontroller");
let babylist = require("./controllers/babylistcontroller");
let mamalist = require("./controllers/mamalistcontroller");

app.use(express.json());
app.use(require("./middleware/headers"));
app.use("/user", user);
app.use("/mamalist", mamalist);
app.use("/babylist", babylist);

db.authenticate()
  .then(() => db.sync({}))
  .then(() =>
    app.listen(3000, () => {
      console.log(`App is listening on port: 3000`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });
