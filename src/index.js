require("dotenv").config(); //load env file

const express = require("express");
const app = express();
const port = process.env.PORT; //at (current process) in (env file) get (parameter port)

app.get("/", (req, res) => {
  res.send("Hello World! Hello Hello");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
