const cheerio = require('cheerio');

const CHA = 'abcdefghijklmnopqrstuvwxyz0123456789'


function rndString(n) {
    rString = ''
    while(n--) {
        let i = rndInt(36)
        rString += CHA.charAt(i)
    }
    return rString
}

/**
 * retuns random int in range [ 0, n-1 ]
 */
function rndInt(n) {
    return Math.floor(Math.random() * n);
}


module.exports = { rndString, parseFtaa, parseBfaa, parseCsrfToken}