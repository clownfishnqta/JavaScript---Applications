function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/appdata/kid_HJcje3vqM';
    const kinveyUsername = 'guest';
    const kinveyPassword = 'guest';
    const base64auth = btoa(kinveyUsername + ":" + kinveyPassword);
    const authHeaders = {
        'Authorization': 'Basic ' + base64auth,
        'Content-type': 'application/json'
    };
    $('#aside').find('.load').click(listAllCatches);
    $('#addForm').find('.add').click(addCatch);

    function request(method, endpoint, data) {
        return $.ajax({
            method: method,
            url: baseUrl + endpoint,
            headers: authHeaders,
            data: JSON.stringify(data)
        })
    }


    function listAllCatches() {
        request('GET', '/biggestCatches/')
            .then(displayCatches)
            .catch(handleError);
    }


    function displayCatches(data) {
        let catches = $('#catches');
        catches.empty();
        for (let el of data) {
            catches.append($(`<div class="catch" data-id="${el._id}">`)
                .append($('<label>')
                    .text('Angler'))
                .append($(`<input type="text" class="angler" value="${el['angler']}"/>`))
                .append($('<label>')
                    .text('Weight'))
                .append($(`<input type="number" class="weight" value="${el['weight']}"/>`))
                .append($('<label>')
                    .text('Species'))
                .append($(`<input type="text" class="species" value="${el['species']}"/>`))
                .append($('<label>')
                    .text('Location'))
                .append($(`<input type="text" class="location" value="${el['location']}"/>`))
                .append($('<label>')
                    .text('Bait'))
                .append($(`<input type="text" class="bait" value="${el['bait']}"/>`))
                .append($('<label>')
                    .text('Capture Time'))
                .append($(`<input type="number" class="captureTime" value="${el['captureTime']}"/>`))
                .append($('<button class="update">Update</button>').click(updateCatch))
                .append($('<button class="delete">Delete</button>').click(deleteCatch)))
        }
    }

    function updateCatch() {
        let catchItem = $(this).parent().attr('data-id');
        let data = getCatchObj(catchItem);

        request('PUT', `/biggestCatches/${catchItem}`, data)
            .then(listAllCatches)
            .catch(handleError);
    }

    function deleteCatch() {
        let catchId = $(this).parent().attr('data-id');

        request('DELETE', `/biggestCatches/${catchId}`)
            .then(listAllCatches)
            .catch(handleError);
    }

    function addCatch() {
        let catchItem = $(this).parent();
        let newCatchObj = getCatchObj(catchItem);

        request('POST', `/biggestCatches/`, newCatchObj)
            .then(listAllCatches)
            .catch(handleError)
    }

    function getCatchObj(catchItem) {
        return {
            angler: catchItem.find('.angler').val(),
            weight: Number(catchItem.find('.weight').val()),
            species: catchItem.find('.species').val(),
            location: catchItem.find('.location').val(),
            bait: catchItem.find('.bait').val(),
            captureTime: Number(catchItem.find('.captureTime').val())
        };
    }

    function handleError(err) {
        alert(`Error happened: ${err.statusText}`)
    }
}