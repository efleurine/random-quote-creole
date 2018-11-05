const Hapi = require('hapi');
const plugins = require('./plugins');
const routes = require('./routes');
const handlebars = require('handlebars');
const mongoose = require('mongoose');

let MONGODB_URL;
if (process.env.MONGODB_URI) {
    MONGODB_URL = process.env.MONGODB_URI;
} else {
    MONGODB_URL = 'mongodb://localhost/haiti_quote';
}
mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

const server = Hapi.server({
    host: 'localhost',
    port: process.env.PORT || 3000,
    routes: {
        cors: {
            origin: ['*']
        }
    }
});



// start the server
const start = async () => {
    try {
        await server.register(plugins); // register plugins

        server.views({
            engines: {
                html: handlebars
            },
            relativeTo: __dirname,
            path: 'views',
            isCached: false
        });

        server.route(routes);


        await server.start(); // starting the server
    } catch (error) {
        console.log('Error: ', error);
        process.exit(1);
    }

    console.log('Server running at: ', server.info.uri);
}

start();