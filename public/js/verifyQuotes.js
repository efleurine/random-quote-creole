
// Display the Quotes
const render = (quotes) => {
    console.log('Data: ', quotes);
    $('.quotes-container').empty();
    if (quotes.length <= 0) {
        $('.quotes-container').append('<h3>Pa gen oken Pwovèb!</h3>');;
    }
    for (let i = 0; i < quotes.length; i++) {
        const description = quotes[i].quote;
        const id = quotes[i]._id;
        const author = quotes[i].author;

        const card = createCard(author, description, id);
        $('.quotes-container').append(card);
    }
};

const createCard = (author, description, id) => {
    const card = `
        <div class="card" data-quote-id="${id}">
            <div class="card-header">
                <p>Quote</p>

                <div class="card-buttons">
                    <button class="btn-primary verify" data-id="${id}">Verify</button>
                    <button class="btn-danger delete" data-id="${id}">Delete</button>
                </div>
            </div>

            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>${description}</p>
                    <footer class="blockquote-footer"> ${author}</footer>
                </blockquote>
            </div>
        </div>
    `;
    return card;
};



const fetchDataOnLoad = () => {
    $.ajax({
        url: '/unverified/quotes',
        method: 'GET'
    })
        .done((quotes) => render(quotes))
        .fail((error) => console.log('Error: ', error));
};

fetchDataOnLoad();


// Verify Quote
$(document).on('click', '.verify', function () {
    const id = $(this).attr('data-id');
    $.ajax({
        url: '/verify',
        method: 'POST',
        data: {
            id
        }
    })
        .then((data) => $(`[data-quote-id=${id}]`).remove())
        .catch((error) => alert('Failed to update'));
});


// Delete Quote
$(document).on('click', '.delete', function () {
    const id = $(this).attr('data-id');

    $.ajax({
        method: 'DELETE',
        url: '/delete/quote',
        data: {
            id
        }
    })
        .then((response) => $(`[data-quote-id=${id}]`).remove())
        .catch((error) => alert('Ooops, error deleting quote'));
});