const express = require("express");

const bodyparser = require("body-parser");

const routes = require("./routes");

const cors = require("cors");

const app = express();

app.use(bodyparser.json());

app.use(cors());

app.use(routes);

app.listen(3333);
