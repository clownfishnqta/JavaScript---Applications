const URL = 'https://phonebook-nakov.firebaseio.com/phonebook';

$('#btnLoad').on('click', loadData);
$('#btnCreate').on('click', postData);

function loadData() {
    $.ajax({
        method: 'GET',
        url: URL + '.json'
    }).then(loadSuccess)
        .catch(loadError);

    function loadSuccess(res) {
        $('#phonebook').empty();
        for (let key in res) {
            if (res[key] !== null) {
                let li = $(`<li>${res[key].name}: ${res[key].phone} </li>`).append($('<button>[Delete]</button>')
                    .click(function () {
                        $.ajax({
                            method: 'DELETE',
                            url: URL + '/' + key + '.json'
                        }).then(() => $(li).remove())
                            .catch(loadError);
                    }));
                $('#phonebook').append(li);
            }
        }
    }
}

function postData() {
    let name = $('#person').val();
    let phone = $('#phone').val();
    let postDataJSON = JSON.stringify({name, phone});

    $.ajax({
        method: 'POST',
        data: postDataJSON,
        url: URL + '.json'
    }).then(createElement)
        .catch(loadError);
    function createElement() {
        let li = $(`<li>${name}: ${phone} </li>`).append($('<button>[Delete]</button>')
            .click(function () {
                $.ajax({
                    method: 'DELETE',
                    url: URL + '/' + name + '.json'
                }).then(() => $(li).remove())
                    .catch(loadError);
            }));
        $('#phonebook').append(li)
    }
    $('#person').val('');
    $('#phone').val('');
}



function loadError(err) {
    console.log(err);
}
