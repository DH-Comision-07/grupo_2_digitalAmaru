const express = require("express");
const app = express();
const path = require("path");
const port = 3300;

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(port,() => {
  console.log("Servidor corriendo en el puerto " + port);
});

app.get("/detalle-de-curso", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/product-details.html"));
});