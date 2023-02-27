var Helper = {
    changeInnerTxt: function(id, text) {
        document.getElementById(id).innerText = text;
    }
}

var exec = false;

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function injectScript() {
    const tab = await getCurrentTab();
    Helper.changeInnerTxt('myBtn', 'Stop connecting')
    exec = true;
    chrome.scripting.executeScript({
        target: { tabId: tab.id},
        files: ["js/content-script.js"]
    })
}

const buttonClick = () => {
    if (exec) {
        Helper.changeInnerTxt('myBtn', 'Start connecting')
        exec = false
    } else {
        injectScript();
    }
}

var button = document.getElementById("myBtn");
button.addEventListener(
    "click", buttonClick, false
)

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if (exec) { 
            console.log('Action: clicked')
            console.log(typeof msg.action)
            port.postMessage({reply: msg.action}); 
            document.getElementById('plsBtn').click()
        } else {
            port.postMessage({reply: -1});
        }
    }) 
})
