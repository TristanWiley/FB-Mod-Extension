function click(e) {
    var el = document.getElementById('messageText');
    chrome.storage.sync.set({ 'messageText': e.target.getAttribute('data-id') }, function() {
        changeMessage(e.target.getAttribute('data-id'));
    });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    chrome.storage.sync.get('messageText', function(item) {
        var messageText = document.getElementById('messageText');
        messageText.value = item.messageText;
    });
});


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('messageText').addEventListener('input', function() {
        changeMessage(messageText.value);
    });

    chrome.storage.sync.get({'messageText' : 'Memes are not allowed, please post them in HH Sensible Chucke (https://www.facebook.com/groups/HHSensibleChuckle/). This is a warning.'}, function(item) {
        var messageText = document.getElementById('messageText');
        messageText.value = item.messageText;
    });
});

function changeMessage(message) {
    chrome.storage.sync.set({ 'messageText': message }, function() {
        console.log('Message changed');
    });
}
