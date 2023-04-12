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

btnCarregar.addEventListener('click', carregar)

function convertArrayToCSV(array) {
    let output = '';
    for (let i = 0; i < array.length; i++) {
        const row = array[i];

        let line = '';
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            if (cell) {
                line += cell.trim();
            }
            if (j != row.length - 1) {
                line += ',';
            }
        }
        if (i != array.length - 1) {
            line += '\n';
        }
        output += line;
    }
    return output;
}
