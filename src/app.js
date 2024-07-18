const express = require('express');
const app = express();
const path = require('path');
const port = 7777;

const cookies = require('cookie-parser');
const session = require('express-session');
const { Sequelize } = require('sequelize');
const config = require('./db/config/config');

// Rutas
const userRouter = require('./routes/users');
const productRouter = require('./routes/product');
const indexRouter = require('./routes/index');


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

// Configuración de Sequelize
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: 'mysql',
    port: config.development.port || 3300,
});

// Verificar conexión a la base de datos
sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos establecida con éxito.'))
    .catch(err => console.error('No se pudo conectar a la base de datos:', err));

// Rutas
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/', indexRouter);

// Puerto de escucha
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
});

