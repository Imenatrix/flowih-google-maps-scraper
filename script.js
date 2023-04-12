var modal = document.querySelector('.w6VYqd').querySelectorAll('.aIFcqe')[1]
var cards = document.querySelectorAll('[role="article"]')
var list = document.querySelector('[role="feed"]')
var obs = new MutationObserver(callback)
var counter = 0

cards[counter].firstChild.click()
obs.observe(modal, {childList : true})

var output = []

function callback() {
    var name = document.querySelector('.DUwDvf')?.textContent
    var phone = document.querySelector('[data-item-id^="phone:"]')?.ariaLabel.split(': ')[1]
    var adress = document.querySelector('[data-item-id="address"]')?.ariaLabel.split(': ')[1]
    output.push([name, phone, adress])
    counter++
    if (counter == cards.length) {
        chrome.runtime.sendMessage({type : 'completed', payload : output})
        obs.disconnect()
    }
    else {
        cards[counter].firstChild.click()
    }
}