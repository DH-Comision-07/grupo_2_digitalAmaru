const express = require("express");
const app = express();
const path = require("path");
const port = 7777;
//const index = require('./routes/index');


const cookies = require('cookie-parser');
const session = require('express-session');

const publicPath = path.resolve(__dirname, "../public");



app.use(express.static(publicPath));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookies());

app.use(session({secret: "esto es secreto!",
                resave: false,
                saveUninitialized: true
              }));
const userLoggedMidlewere = require("./middlewers/userloggedmidleweres")
app.use(userLoggedMidlewere);
app.use(cookies());


let userRouter = require("./routes/users")
// ruta a user
app.use('/user', userRouter);


let productRouter = require("./routes/product")
// ruta a user
app.use('/product', productRouter);


let indexRouter = require("./routes/index")
//ruta a home
app.use('/', indexRouter) 

//ruta de producto




    app.get("/cart", (req, res) => {
   res.render("cart")
   });

    //ruta de main
 //   app.get("/nosotros", (req, res) => {
   //   res.render("nosotros")
 //   });

let cartRouter = require("./routes/cart");
app.use("/cart", cartRouter);

app.listen(port, () => 
console.log(`http://localhost:${port}`)
)

//vista de listado de productos, vista de agregar producto (formulario), edicion de productos, vista perfil de usuario, vista de edicion de usuario (formulario), vista donde enlisten usuarios. cada uno con ruta