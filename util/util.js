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

/** 
 * parese ftaa from inital get request for /enter
*/
function parseFtaa(data) {
    const $ = cheerio.load(data)
    const scriptTag = $('script:contains("window._ftaa")')

    if (scriptTag.length > 0) {
        const scriptContent = scriptTag.html();
        const match = scriptContent.match(/window._ftaa = "(.*?)"/)

        if (match) {
            const value = match[1]
            return value
        } else {
            return ''
        }
    } else {
        return '' // Script tag containing window._ftaa not found
    }
}

/** 
 * parse bfaa from initial get request
*/
function parseBfaa(data) {
    const $ = cheerio.load(data)
    const scriptTag = $('script:contains("window._bfaa")')

    if (scriptTag.length > 0) {
        const scriptContent = scriptTag.html()
        const match = scriptContent.match(/window._bfaa = "(.*?)"/)

        if (match) {
            const value = match[1]
            return value
        } else {
            return ''
        }
    } else {
        return ''
    }
}


function parseCsrfToken(data) {
    const $ = cheerio.load(data);
    const csrfTokenElement = $('span.csrf-token');
    const csrfToken = csrfTokenElement.attr('data-csrf');
    return csrfToken
}   



module.exports = { rndString, parseFtaa, parseBfaa, parseCsrfToken}