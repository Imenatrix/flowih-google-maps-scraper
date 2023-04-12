var modal = document.querySelectorAll('[role="main"')[1].parentElement
var cards = document.querySelectorAll('[role="article"')
var obs = new MutationObserver(callback)
var counter = 0

cards[0].firstChild.click()
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
        obs.disconnect()
    }
    else {
        cards[counter].firstChild.click()
    }
}