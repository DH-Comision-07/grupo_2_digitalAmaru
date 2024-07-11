const express = require("express");
const app = express();
const path = require("path");
const port = 3300;

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));


app.listen(port,() => {
  console.log("Servidor corriendo en el puerto " + port);
});
