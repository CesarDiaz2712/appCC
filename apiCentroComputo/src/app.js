const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
//Inicializaciones
const app = express();
require('./database');

//configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    usersDir: path.join(app.get('views'), 'users'),
    extname: 'hbs'
}));
app.set ('view engine', 'hbs');

//middleware
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

//Global variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/reserva'));
app.use(require('./routes/users'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Servidor escuchando
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});