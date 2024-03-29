const express = require("express");
const app = express();
const path = require("path");
const port = 3300;
const index = require('./routes/index');

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index")
});




//ruta de producto
app.get("/detalle-de-curso", (req, res) => {
  res.render("product-details")
});

//ruta de usuario
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/register.html"));
});
//ruta de usuario
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.listen(port, () => 
console.log(`http://localhost:${port}`)
)

//vista y ruta de carrito, vista de listado de productos, vista de agregar producto (formulario), edicion de productos, vista perfil de usuario, vista de edicion de usuario (formulario), vista donde enlisten usuarios. cada uno con ruta