var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var authRouter = require("./routes/account");

const socket = require("socket.io");
const cors = require("cors");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/myproject";
mongoose.connect(url, { useNewUrlParser: true });
const mongo = mongoose.connection;
mongo.on("open", () => {
  console.log("connection etablie ...");
});
const port = 5000;
var server = app.listen(port, () => {
  console.log(port);
});
const io = socket(server);
app.use((req, res, next) => {
  if (req.method === "POST") {
    io.emit("message", "Vous êtes bien connecté !");
  }

  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Set up socket.io
let online = 0;

io.on("connection", socket => {
  online++;
  console.log(`Socket ${socket.id} connected.`);
  console.log(`Online: ${online}`);
  io.emit("visitor enters", online);

  socket.on("disconnect", () => {
    online--;
    console.log(`Socket ${socket.id} disconnected.`);
    console.log(`Online: ${online}`);
    io.emit("visitor exits", online);
  });
});
module.exports = app;
