
const express         =            require('express');
const { engine }      = require('express-handlebars');
const express_session =    require('express-session');
const connect_flash   =      require('connect-flash');
const body_parser     =        require('body-parser');
const path            =               require('path');
const dotenv          =             require('dotenv');

const application = express();

dotenv.config();

/* Global Variables */

global.express_router = express.Router();

/* ------ */

/* Express Session Config */

application.use
(
    express_session({ secret: process.env.EXPRESS_SESSION_SECRET_KEY, resave: true, saveUninitialized: true })
);

application.use(connect_flash());

/* ------ */

/* Main Server Middleware */

application.use( (request, response, next) => 
{

    response.locals.success = request.flash('success');
    response.locals.failure = request.flash('failure');

    next();

});

/* ------ */

application.engine(  'handlebars', engine());
application.set('view engine', 'handlebars');

application.use(body_parser.urlencoded({ extended: false }));
application.use(                         body_parser.json());

application.use(express.static(path.join(__dirname, process.env.SERVER_STATIC_FOLDER)));

/* Routes */

require(     './routes/index.js');

require('./routes/cud/create.js');
require('./routes/cud/update.js');
require('./routes/cud/delete.js');
require(    './routes/search.js');

application.use('/', global.express_router);

/* ------ */

/* Server Listening */

application.listen
(
    process.env.SERVER_LISTENING_PORT, console.log(`\n* Server Listening On ${process.env.SERVER_LISTENING_PORT} Port`)
);