
const render = (quotes) => {
    console.log('Data: ', quotes);
    for (let i = 0; i < quotes.length; i++) {
        const description = quotes[i].quote;
        const id = quotes[i]._id;
        $('.quotes-container').append(displayQuote(description, id));
    }
};

const displayQuote = (description, id) => {
    const quoteContainer = $('<div>')
        .addClass('quote');
    const quote = $('<p>')
        .html(description);
    const button = $('<button>')
        .attr('id', id)
        .html('Verify');

    quoteContainer.append(quote, button);
    return quoteContainer;
};

$.ajax({
    url: '/quotes',
    method: 'GET'
})
    .done((quotes) => render(quotes))
    .fail((error) => console.log('Error: ', error));


$(document).on('click', '.quote > button', function() {
    const id = $(this).attr('id');
    $.ajax({
        url: '/verify',
        method: 'POST',
        data: {
            id
        }
    })
    .then((data) => {
        alert('Successfully updated!!!');
    })
    .catch((error) => {
        alert('Failed to update');
    });
});