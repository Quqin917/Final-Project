function searchCrypto() {
    const searchInput = document.getElementById('cryptoSearchInput').value.toLowerCase();
    const cryptoList = document.getElementById('cryptoList');
    const maxDisplay = 7;

    if (!searchInput) {
        cryptoList.style.display = 'none';
        return;
    }

    cryptoList.style.display = 'block';
    
    const cryptoListItems = document.querySelectorAll('#cryptoList li');
    
    let displayCount = 0;

    cryptoListItems.forEach((cryptoItem) => {
        const cryptoName = cryptoItem.textContent.toLowerCase();
        const showCrypto = cryptoName.includes(searchInput);

        if (showCrypto && displayCount < maxDisplay) {
            cryptoItem.style.display = 'block';
            displayCount++;
        } else {
            cryptoItem.style.display = 'none';
        }
    });
}

function selectCrypto(selectedCrypto) {
    document.getElementById('cryptoSearchInput').value = selectedCrypto;
    document.getElementById('cryptoList').style.display = 'none';
}