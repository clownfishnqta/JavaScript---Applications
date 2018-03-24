function getInfo() {
    let stopId = $('#stopId').val();
    let list = $('#buses');
    list.empty();
    const URL = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;
    $.ajax({
        method: 'GET',
        url: URL
    }).then(handleSuccess)
        .catch(handleError);
    function handleSuccess(res) {
        let busName = res['name'];
        let buses = res['buses'];

        $('#stopName').text(busName);

        for (let busId in buses) {
            let li = $('<li>').text(`Bus ${busId} arrives in ${buses[busId]} minutes`);
            list.append(li);
        }

    }
    function handleError(err) {
        $('#stopName').text('Error');
    }
}