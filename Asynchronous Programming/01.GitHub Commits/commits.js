function loadCommits() {
    let username = $('#username').val();
    let repository = $('#repo').val();


    $.ajax({
        url: `https://api.github.com/repos/${username}/${repository}/commits`
    }).then(handleSuccess)
        .catch(handleError)
}
function handleSuccess(res) {
    for(let obj of res) {
        $('#commits').append($('<li>').text(`${obj.commit.author.name}: ${obj.commit.message}" `));
    }
}
function handleError(err) {
    $('#commits').append($('<li>').text(`Error: ${err.status} (${err.statusText})`));
}