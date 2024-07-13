const express = require('express');
const app = express();
const path = require('path');
const port = 7777;

const cookies = require('cookie-parser');
const session = require('express-session');

const publicPath = path.resolve(__dirname, '../public');

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

const userLoggedMiddleware = require('./middlewers/userloggedmidleweres');
app.use(userLoggedMiddleware);

const userRouter = require('./routes/users');
app.use('/user', userRouter);

const productRouter = require('./routes/product');
app.use('/product', productRouter);

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const cartRouter = require('./routes/cart');
app.use('/cart', cartRouter);

const editCreationRouter = require('./routes/editCreation');
app.use('/editCreation', editCreationRouter);

app.listen(port, () => 
    console.log(`Servidor corriendo en http://localhost:${port}`)
);
