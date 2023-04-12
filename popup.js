var btnCarregar = document.getElementById('btn-carregar')

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
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

btnCarregar.addEventListener('click', carregar)