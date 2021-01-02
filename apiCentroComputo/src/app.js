const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');

import {createRoles} from './libs/initialSetup'
import authRoutes from './routes/auth.routes'
import actividadRoutes from './routes/actividad'
import reservaRoutes from './routes/reserva'

//Inicializaciones
const app = express();
require('./database');
require('./config/passport');
createRoles();

//configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    viewsEstudianteDir: path.join(app.get('views'), 'viewsestudiante'),
    viewsAcademicoDir: path.join(app.get('views'), 'viewsacademico'),
    viewsAuxTecDir: path.join(app.get('views'), 'viewsauxiliartecnico'),
    extname: 'hbs'
}));

app.set ('view engine', 'hbs');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/reserva'));
app.use(require('./routes/users'));
app.use(require('./routes/encuesta'));
app.use(require('./routes/prestamo'));

app.use('/api/auth',authRoutes)
app.use('/act',actividadRoutes)
app.use('/reserv',reservaRoutes)

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Servidor escuchando
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});