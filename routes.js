const Quotes = require('./models/quotes');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            return res.view('index');
        }
    },
    {
        method: 'GET',
        path: '/quotes',
        handler: (req, reply) => {
            return Quotes.find({})
                .then((quotes) => quotes)
                .catch((error) => error);
        }
    },

    {
        method: 'GET',
        path: '/random',
        handler: (req, reply) => {
            return Quotes.find({})
                .then((quotes) => {
                    const randomQuote = Math.floor(Math.random() * quotes.length);
                    return quotes[randomQuote]
                })
                .catch((error) => error);
        }
    },

    {
        method: 'POST',
        path: '/quote',
        handler: (req, reply) => {
            const { quote, author } = req.payload;

            return Quotes.create({
                author,
                quote
            })
                .then((quote) => quote)
                .catch((error) => error);
        }
    },

    // Static Folders
    {
        method: 'GET',
        path: '/{params*}',
        handler: {
            directory: {
                path: ['public/js', 'public/css']
            }
        }
    }
];


module.exports = routes;