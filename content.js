document.addEventListener('DOMContentLoaded', function () {
    let isObserving = true; // initial observing state
    let observer; // declare outside of the function

    // function to click the click to answer button
    function clickAnswerButton() {
        const answerButton = document.querySelector('#pickup-call-button .content[ng-click="ctrl.PickCall()"]');

        if (answerButton && isObserving){
            answerButton.click();
        }
    }

    // function to start the observer
    function startObserver(){
        observer = new MutationObserver(function (mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // nodes are added to the child list now
                    // call the function if observing
                    clickAnswerButton();
                }
            }
        });

        // start observing changes in the pick up call button
        observer.observe(document.getElementById('pickup-call-button'), { childList: true, subtree: true});
    }

    // start observer initially
    startObserver();

    // handle message from the pop up
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === 'toggleObserving') {
            // toggle observe state
            isObserving = !isObserving;

            // if observing is enabled, start the observer
            if (isObserving) {
                startObserver();
                clickAnswerButton();
            } else {
                // if observing is disabled, dissconect the observer
                observer.disconnect();
            }

            // log for demo
            console.log('Observing state:', isObserving);
        }
    });
});