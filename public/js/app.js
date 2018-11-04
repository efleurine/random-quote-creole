


const submitQuote = (event) => {
    event.preventDefault(); // stop browser default behavior

    const authorName = $('#author').val().trim();
    const quote = $('#quote').val().trim();

    $.ajax({
        url: '/quote',
        method: 'POST',
        data: {
            quote,
            author: authorName
        }
    })
    .done((data) => {
        $('#author').val('')
        $('#quote').val('')
        alert('Data has successfully added');
    })
    .fail((error) => {
        alert('Ooops, something happened!!');
    })
};


$('#addQuote').on('click', submitQuote);