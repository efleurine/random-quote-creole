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
        path: '/validation',
        handler: (req, res) => {
            return res.view('verification.html');
        }
    },
    {
        method: 'GET',
        path: '/quotes',
        handler: (req, reply) => {
            return Quotes.find({ })
                .then((quotes) => quotes)
                .catch((error) => error);
        }
    },

    {
        method: 'GET',
        path: '/unverified/quotes',
        handler: (req, reply) => {
            return Quotes.find({ isVerified: false })
                .then((quotes) => quotes)
                .catch((error) => error);
        }
    },

    {
        method: 'GET',
        path: '/random',
        handler: (req, reply) => {
            return Quotes.find({ isVerified: true })
                .then((quotes) => {
                    const randomQuote = Math.floor(Math.random() * quotes.length);
                    return quotes[randomQuote]
                })
                .catch((error) => error);
        }
    },

    {
        method: 'DELETE',
        path: '/delete/quote',
        handler: (req, res) => {
            const id = req.payload.id;

            return Quotes.deleteOne({ _id: id }, function (err) {
                if (err) return { errorMessage: 'Not able to delete quote' };
                return { message: 'Quote has been deleted' }
              });
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

    {
        method: 'POST',
        path: '/verify',
        handler: (req, res) => {
            const id = req.payload.id;
            return Quotes.update({ _id: id }, { $set: { isVerified: true }}, (err, data) => {
                if (err) {
                    return { errorMessage: 'Not able to update the Quote' };
                }

                return { message: 'Data has successfully updated!' };
            });
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