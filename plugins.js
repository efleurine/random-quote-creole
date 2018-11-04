const hapiPino = require('hapi-pino');
const inert = require('inert');
const vision = require('vision');

const plugins = [
    {
        plugin: hapiPino,
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    },
    {
        plugin: inert
    },
    {
        plugin: vision
    }
];

module.exports = plugins;