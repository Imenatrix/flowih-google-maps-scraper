var modal = document.querySelectorAll('[role="main"')[1].parentElement
console.log(modal)
var obs = new MutationObserver(() => {
    var name = document.querySelector('.DUwDvf')?.textContent
    var phone = document.querySelector('[data-item-id^="phone:"]')?.ariaLabel.split(': ')[1]
    var adress = document.querySelector('[data-item-id="address"]')?.ariaLabel.split(': ')[1]
    console.log(name)
    console.log(phone)
    console.log(adress)
})
obs.observe(modal, {childList : true})