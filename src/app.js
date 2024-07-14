const express = require('express');
const app = express();
const path = require('path');
const port = 7777;

const cookies = require('cookie-parser');
const session = require('express-session');

// Rutas
const userRouter = require('./routes/users');
const productRouter = require('./routes/product');
const indexRouter = require('./routes/index');
const cartRouter = require('./routes/cart');
const editCreationRouter = require('./routes/editCreation');

// Middlewares
const publicPath = path.resolve(__dirname, '../public');
const userLoggedMiddleware = require('./middlewers/userloggedmidleweres');

// Configuración de Express
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookies());
app.use(session({
    secret: "esto es secreto!",
    resave: false,
    saveUninitialized: true
}));
app.use(userLoggedMiddleware);

// Rutas
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/editCreation', editCreationRouter);
app.use('/', indexRouter);

// Puerto de escucha
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
