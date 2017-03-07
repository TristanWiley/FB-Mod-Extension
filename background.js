window.onload = function() {
    var userID = "";
    var messageText = "Memes are not allowed, please post them in HH Sensible Chucke (https://www.facebook.com/groups/HHSensibleChuckle/). This is a warning.";
    chrome.storage.sync.get({ 'messageText': 'Memes are not allowed, please post them in HH Sensible Chucke (https://www.facebook.com/groups/HHSensibleChuckle/). This is a warning.' }, function(item) {
        messageText = item.messageText;
    });

    var addElementObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes[0] && mutation.addedNodes[0].className == "uiContextualLayerPositioner uiLayer") {
                var delElem = findByText(mutation.addedNodes[0], "Delete Post");
                if (delElem) {
                    urlText = delElem.children[0].getAttribute('ajaxify');
                    userID = urlText.split('actor_id%22%3A').pop().split('%2C%22story_id').shift();
                    if (!findByText(mutation.addedNodes[0], "Remove Post and Warn")) {
                        var newElem = document.createElement('div');
                        newElem.innerHTML = "<li id=\"removeWarn\" class=\"_54ni _41t6 __MenuItem\" role=\"presentation\"><a class=\"_54nc\" href=\"#\" rel=\"async-post\" ajaxify=\"\" role=\"menuitem\"><span><span class=\"_54nh\"><div class=\"_41t5\"><i class=\"_41t7 img sp_WiysXVzM3T7 sx_042cf8\"><\/i><i class=\"_41t8 img sp_cwOCzV77_Nt sx_0e6f38\"><\/i>Remove Post and Warn<\/div><\/span><\/span><\/a><\/li>\r\n";

                        if (delElem) {
                            delElem.parentNode.insertBefore(newElem, delElem.nextSibling);
                            delElem.setAttribute("id", "delClick" + userID);
                            var daClone = document.body.appendChild(delElem);

                            newElem.addEventListener("click", function(e) {
                                var z = document.createElement('div');
                                z.innerHTML = "<a class=\"_42ft _4jy0 _4jy4 _517h _51sy\" role=\"button\" data-loggable=\"ProfileHighQualityLogger\"  ajaxify=\"\/ajax\/messaging\/composer.php?ids%5B0%5D=" + userID + "&amp;ref=timeline\" rel=\"dialog\" id=\"" + "messageUser" + userID + "\" tabindex=\"0\"><i class=\"_3-8_ img sp_jfZgYnwqOin sx_55e779\"><\/i>Message<\/a>";
                                document.body.appendChild(z);
                                document.getElementById("delClick" + userID).children[0].click();
                                document.getElementById("messageUser" + userID).click();
                            }, false);
                        }
                    }
                }
            }

        });
    });

    var config = { childList: true, subtree: true };

    addElementObserver.observe(document.body, config);


    var messageObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var added = mutation.addedNodes;
                for (var j = 0; j < added.length; j++) {
                    if (added[j].tagName == "DIV") {
                        var t = document.getElementsByName("message_body")[0];
                        if (t) {
                            t.value = messageText;
                        }
                    }
                }
            }
        });
    });

    var config = { childList: true, subtree: true };

    messageObserver.observe(document.body, config);


    function findByText(elem, text) {
        var aTags = elem.getElementsByTagName("li");
        var searchText = text;
        var found;

        for (var i = 0; i < aTags.length; i++) {
            if (aTags[i].textContent == searchText) {
                found = aTags[i];
                break;
            }
        }
        return found;
    }
}