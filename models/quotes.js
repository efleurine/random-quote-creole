const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const QuoteSchema = new Schema({
    author: {
        type: 'string',
        default: 'N/A'
    },
    isVerified: {
        type: 'boolean',
        default: false
    },
    quote: 'string'
}, { timestamps: true });


const Quote = mongoose.model('quote', QuoteSchema);

module.exports = Quote;