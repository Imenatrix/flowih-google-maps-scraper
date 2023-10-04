var modal = document.querySelector('.w6VYqd').querySelectorAll('.aIFcqe')[1]
var modal_button = document.querySelector('svg')?.parentElement.parentElement
var cards = document.querySelectorAll('.Nv2PK')
var list = document.querySelector('[role="feed"]')
var obs = new MutationObserver(callback)
var counter = 0;

obs.observe(modal, {childList : true})

var output = []
var free_lock
var lock = new Promise((resolve, reject) => {
    free_lock = resolve
})

function callback() {
    free_lock()
    lock = new Promise((resolve, reject) => {
        free_lock = resolve
    })
}

function scrape() {
    return new Promise(async (resolve) => {
        if (modal_button) {
            modal_button.click()
            await lock
        }
        for (let card of cards) {
            card.firstChild.click()
            await lock
            var name = document.querySelector('.DUwDvf')?.textContent
            var phone = document.querySelector('[data-item-id^="phone:"]')?.ariaLabel.split(': ')[1]
            var adress = document.querySelector('[data-item-id="address"]')?.ariaLabel.split(': ')[1]
            var line = [name, phone, `"${adress}"`]
            console.log(line)
            output.push(line)
        }
        resolve()
    })
}

scrape().then(() => {
    chrome.runtime.sendMessage({type : 'completed', payload : output})
    obs.disconnect()
})
