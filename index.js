let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
const url=`mongodb+srv://sujathasenthamarai:suji$17yazh@cluster0.oquejho.mongodb.net/curd?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(url)
.then((x)=>{console.log("Server Connected Successfully");console.log(
  `Connected to Mongo! Database name: "${x.connections[0].name}"`,
);})
.catch((err)=>{console.error(err)});

// Express Route
const studentRoute = require("./routes/student.routes");

// Connecting mongoDB Database
mongoose.connect(url)
.then((x)=>{console.log("Server Connected Successfully");console.log(
  `Connected to Mongo! Database name: "${x.connections[0].name}"`,
);})
.catch((err)=>{console.error(err)});

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use("/students", studentRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
