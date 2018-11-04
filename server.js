const Hapi = require('hapi');
const plugins = require('./plugins');
const routes = require('./routes');
const handlebars = require('handlebars');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/haiti_quote', { useNewUrlParser: true });

const server = Hapi.server({
    host: 'localhost',
    port: process.env.PORT || 9000,
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