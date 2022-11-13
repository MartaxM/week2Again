const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const upload = multer();

app.listen(port, () => console.log(`Server listening a port ${port}!`));

app.get("/hello", (req, res) => {
  res.json({ msg: "Hello world" });
});

app.get("/echo/:id", (req, res) => {
  res.json({ id: req.params.id });
});

app.post("/sum", upload.array(), (req, res) => {
  let numbers = [];

  for (let i = 0; i < req.body.numbers.length; i++) {
    numbers.push(req.body.numbers[i]);
  }

  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  res.json({ sum: sum });
});

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

let list = [];

app.post("/list", upload.array(), (req, res) => {
  list.push(req.body.text);
  console.log(req.body.text + " added to the list!");
  res.json({ list: list });
});

/*app.get("/list", (req, res) => {
  res.json({ list: list });
});*/
