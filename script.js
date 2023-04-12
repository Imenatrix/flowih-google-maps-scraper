var modal = document.querySelector('.w6VYqd').querySelectorAll('.aIFcqe')[1]
var modal_button = document.querySelector('svg')?.parentElement.parentElement
var cards = document.querySelectorAll('[role="article"]')
var list = document.querySelector('[role="feed"]')
var obs = new MutationObserver(callback)
var counter = 0;

(modal_button || cards[1].firstChild).click()
obs.observe(modal, {childList : true})

var output = []

function callback() {
    if (counter == cards.length) {
        chrome.runtime.sendMessage({type : 'completed', payload : output})
        obs.disconnect()
    }
    else {
        cards[counter].firstChild.click()
    }

    if (counter > 0) {
        var name = document.querySelector('.DUwDvf')?.textContent
        var phone = document.querySelector('[data-item-id^="phone:"]')?.ariaLabel.split(': ')[1]
        var adress = document.querySelector('[data-item-id="address"]')?.ariaLabel.split(': ')[1]
        var line = [name, phone, `"${adress}"`]
        console.log(line)
        output.push(line)
    }

    counter++
}