const express = require("express");
const app = express();
const path = require("path");
const port = 3300;

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.get("/detalle-de-curso", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/product-details.html"));
});


app.listen(port,() => {
  console.log("Servidor corriendo en el puerto " + port);
});
