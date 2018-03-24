function attachEvents() {
    const URL = 'https://messenger-c231b.firebaseio.com/messenger/.json';
    $('#refresh').click(attachRefresh);
    $('#submit').click(attachSend);

    function attachSend() {
        let messageJson = {
            "author": $('#author').val(),
            "content": $('#content').val(),
            "timestamp": Date.now()
        };

        let sendMessageRequest =  {
            url: URL,
            method: 'POST',
            data: JSON.stringify(messageJson),
            success: attachRefresh
        };

        $.ajax(sendMessageRequest);
    }

    function attachRefresh() {
        $.get(URL)
            .then(displayMessages);
    }

    function displayMessages(messages) {
        let output = $('#messages');
        let messagesStr= '';
        for(let key in messages) {
            messagesStr += `${messages[key]["author"]}: ${messages[key]["content"]}\n`;
        }

        output.text(messagesStr)
    }
}