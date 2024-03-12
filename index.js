const express = require("express");
const app = express();
const routes = require("./src/routes");
const cors = require("cors");
const db = require("./src/db");
const models = require("./src/models");
const corsOptions = {
  origin: ["http://localhost:5173", "https://tmdb-client-ruddy.vercel.app/"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", routes);

db.sync({ alter: true }).then(() => {
  console.log("Db connected");
  app.listen(4000, () => {
    console.log(`Server listening at port 4000`);
  });
});
