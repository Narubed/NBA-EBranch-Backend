let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let PORT = process.env.PORT || 8008;
require("dotenv").config();

const cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));
// homepage route
const api = "/v1/ebranch";
app.get("/", (req, res) => {
  return res.send({
    error: false,
    message: "Welcome to RESTful CRUD API with NodeJS, Express, MYSQL",
    written_by: "Narubed ",
  });
});

app.post(api + "/change_credit", require("./models/edit.platform.credit"));
app.get(api + "/mobile_topup", require("./models/mobile_topup/get.all.topup_order"));

app.get(api + "/members", require("./models/get.all.members"));
app.listen(PORT, () => {
  console.log("Node App is running on port =", PORT);
});

module.exports = app;
