const express = require("express");
const app = express();
const path = require("path");
const port = 8887;
const index = require('./routes/index');

const cookies = require('cookie-parser');

const session = require('express-session');

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookies());

app.use(session({secret: "esto es secreto!",
                resave: false,
                saveUninitialized: true
              }));


let userRouter = require("./routes/users")
// ruta a user
app.use('/user', userRouter);

let indexRouter = require("./routes/index")
//ruta a home
app.use('/', indexRouter) 

//ruta de producto
let productRouter = require("./routes/product")
app.use("/detalle-de-curso", productRouter);


 //   app.get("/cart", (req, res) => {
   //   res.render("cart")
 //   });

    //ruta de main
 //   app.get("/nosotros", (req, res) => {
   //   res.render("nosotros")
 //   });



app.listen(port, () => 
console.log(`http://localhost:${port}`)
)

//vista de listado de productos, vista de agregar producto (formulario), edicion de productos, vista perfil de usuario, vista de edicion de usuario (formulario), vista donde enlisten usuarios. cada uno con ruta