function decimalToPercentage(decimal) {
    const percentage = Math.abs(100 - (decimal * 100)).toFixed(2);
    const formattedPercentage = parseFloat(percentage).toString() + '%';
    return formattedPercentage.replace(/(\.0*|(?<=\.\d)0*)%/, '%');
}

function formatNumber(number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + ' B';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + ' M';
    } else {
        return number.toFixed(2);
    }
}

module.exports = {
    decimalToPercentage: decimalToPercentage,
    formatNumber: formatNumber
}