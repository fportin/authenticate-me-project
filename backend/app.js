const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const routes = require('./routes');

const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
if (!isProduction) {
    app.use(cors());
}
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true,
    },
}));

app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error('The requested page could not be found.');
    err.title = 'Page Not Found';
    err.errors = ['The requested page couldn\'t be found.'];
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next)=> {
    res.status(err.status || 500);
    console.log(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});



module.exports = app;

