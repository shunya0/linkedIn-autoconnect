var HTMLParser = {
    buttons: null,
    send: null,
    modal: null,
    getEntity: function (entityName) {
        this.buttons = document.getElementsByClassName(entityName);
        return this;
    },

    getChildNodes: function() {
        this.buttons = Array.prototype.map.call(this.buttons, (el) => el.childNodes);
        return this;
    },

    filterValidNodes: function (nodeLength) {
        this.buttons = this.buttons.filter((el) => el.length == nodeLength)
        return this;
    },

    getTargetDiv: function (targetIndex) {
        this.buttons = this.buttons.map((el) => el[targetIndex]);
        return this;
    },

    filterButtons: function (buttonText) {
        this.buttons = this.buttons.filter((el) => el.innerText === buttonText);
        return this;
    },

    getButtons: function (targetIndex) {
        this.buttons = this.buttons.map((el) => el.childNodes[targetIndex]);
        return this;
    },

    getById: function (id) {
        this.send = document.getElementById(id);
        return this;
    },

    getChildren: function () {
        this.send = this.send.children;
        return this;
    },

    getChildrenByIndex: function (index) {
        this.send = this.send[index].children;
        return this;
    },

    getDocById: function (id) {
        this.modal = document.getElementById(id);
        return this;
    },

    getChildModal: function () {
        this.modal = this.modal.children;
        return this;
    },

    getChildModalByIndex: function (index) {
        this.modal = this.modal[index].children;
        return this;
    }
}

var Utils = {
    getRandomNumber: function (min, max) { 
        return Math.floor(Math.random() * (max - min) + min) 
    }
}

var Config = {
    connection: 'extension_connect',
    minTime: 5,
    maxTime: 10,
    message: "Hi, although I've never gotten the chance to work with you. I'd like to add you to my professional network on LinkedIn."
}


// Reducing the connect buttons into buttons array for perusal
HTMLParser.getEntity('entity-result__actions').getChildNodes().filterValidNodes(13).getTargetDiv(7).filterButtons('Connect').getButtons(4)
console.log(HTMLParser.buttons)

// Initializing connection port and timeout variable
var port = chrome.runtime.connect({name: Config.connection})
var timeout = 0
var timer;
for (index = 0; index < HTMLParser.buttons.length; index++) {
    timeout += Utils.getRandomNumber(Config.minTime, Config.maxTime);
    ((index) => {
        timer = setTimeout(() => {
            console.log('Sending', index)
            try {
                port.postMessage({action: index})
            } catch (err) {
                console.log(err);
            }
        }, timeout * 1000)
    })(index); 
}

// Listener for reply from extension popup
port.onMessage.addListener((msg) => {
    console.log("Reply received")
    if (msg.reply >=0) { 
        console.log(msg.reply)
        HTMLParser.buttons[msg.reply].click()
        // To handle the first modal, if it appears
        setTimeout(() => {
            HTMLParser.getById('artdeco-modal-outlet').getChildren()
            if (HTMLParser.send.length > 0) {
                HTMLParser.getChildrenByIndex(0).getChildrenByIndex(0).getChildrenByIndex(4)
                HTMLParser.send[0].click()
                // To handle the second modal, if it appears
                setTimeout(() => {
                    HTMLParser.getDocById('artdeco-modal-outlet').getChildModal().getChildModalByIndex(0)
                    if (document.getElementById('send-invite-modal').innerText != 'You can customize this invitation') {
                        var textarea = HTMLParser.modal[0].children[3].children[1].children[0];
                        textarea.value = Config.message;
                        HTMLParser.getChildModalByIndex(0).getChildModalByIndex(4);
                        HTMLParser.modal[1].disabled = false;
                        HTMLParser.modal[1].click();
                    }
                }, 1000)
            }
        }, 1000)
    }
})