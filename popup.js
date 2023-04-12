var btnCarregar = document.getElementById('btn-carregar')

function downloadBlob(content, filename, contentType) {
    // Create a blob
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);
  
    // Create a link to download it
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function carregar() {
    const tab = await getCurrentTab()
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["script.js"]
    });
}

async function loadCount() {
    const tab = await getCurrentTab()
    const result = await chrome.scripting.executeScript({
        target : {tabId : tab.id},
        func : () => {
            var cards = document.querySelectorAll('[role="article"]')
            return cards.length
        }
    })
    const number = result[0].result
    const span = document.getElementById('count')
    span.innerText = number
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const output = convertArrayToCSV(message.payload);
    const blob = new Blob([output], {type : 'text/csv;charset=utf-8;'})
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'export.csv')
    link.innerText = 'Download'

    document.body.appendChild(link)
})

loadCount()

btnCarregar.addEventListener('click', carregar)

function convertArrayToCSV(array) {
    return array.map(
        line => line.map(
            cell => (cell || '').toString().trim()
        ).join(',')
    ).join('\n')
}
