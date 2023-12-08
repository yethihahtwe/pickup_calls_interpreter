let isObserving = true; // initial observing state

function updateStatus() {
    // update the status message based on the toggle
    document.getElementById('status').innerText = isObserving ? 'Monitoring' : 'Not Monitoring';
}
document.getElementById('toggleButton').addEventListener('click', function() {
    // toggle observing state
    isObserving = !isObserving;

    // send a message to content.js to toggle observe
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleObserving'});

        // update the status
        updateStatus();
    });
});