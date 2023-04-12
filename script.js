var modal = document.querySelector('.w6VYqd').querySelectorAll('.aIFcqe')[1]
var cards = document.querySelectorAll('[role="article"]')
var list = document.querySelector('[role="feed"]')
var obs = new MutationObserver(callback)
var counter = counter ? counter : 0

cards[counter].firstChild.click()
obs.observe(modal, {childList : true})

function callback() {
    var name = document.querySelector('.DUwDvf')?.textContent
    var phone = document.querySelector('[data-item-id^="phone:"]')?.ariaLabel.split(': ')[1]
    var adress = document.querySelector('[data-item-id="address"]')?.ariaLabel.split(': ')[1]
    console.log(name)
    console.log(phone)
    console.log(adress)
    counter++
    if (counter == cards.length - 1) {
        list.scrollTo({top : list.scrollHeight})
        obs.disconnect()
    }
    else {
        cards[counter].firstChild.click()
    }
}