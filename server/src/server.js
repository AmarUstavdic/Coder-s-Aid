const axios = require('axios');
const qs = require('qs');
const cheerio = require('cheerio');
const secret = require('../../secret')



let config1 = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://codeforces.com/enter',
    headers: {
        'authority': 'codeforces.com',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.6',
        'cache-control': 'no-cache',
        'cookie': 'JSESSIONID=0713344E6F4EFAD83C53037D034DD31A; 39ce7=CF3ELQWz; evercookie_png=o7wb5akk3trvld10bn; evercookie_etag=o7wb5akk3trvld10bn; evercookie_cache=o7wb5akk3trvld10bn; 70a7c28f3de=o7wb5akk3trvld10bn; lastOnlineTimeUpdaterInvocation=1698788521590; X-User=; cf_clearance=byIz4MmNVulD1zrQ0agYhe0hmuVRQ9xhI7FfvYh2waM-1698798738-0-1-9782c615.fce71e2.c08399f5-0.2.1698798738; X-User-Sha1=; 39ce7=CF16rAxW; JSESSIONID=EC742EAF145E533D5CF731BD882CFB91; X-User-Sha1=',
        'pragma': 'no-cache',
        'sec-ch-ua': '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'sec-gpc': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
    }
};

async function main() {

    let csrf = ''
    let ftaa = ''
    let bfaa = ''
    await axios.request(config1)
        .then((response) => {


            const $ = cheerio.load(response.data);
            const csrfToken = $('.csrf-token').attr('data-csrf');

            const ftaaRegex = /window\._ftaa\s*=\s*"([^"]+)"/;
            const bfaaRegex = /window\._bfaa\s*=\s*"([^"]+)"/;

            const ftaaMatch = response.data.match(ftaaRegex);
            const bfaaMatch = response.data.match(bfaaRegex);

            const ftaaValue = ftaaMatch ? ftaaMatch[1] : 'ftaa not found';
            const bfaaValue = bfaaMatch ? bfaaMatch[1] : 'bfaa not found';

            csrf = csrfToken
            ftaa = ftaaValue
            bfaa = bfaaValue
        })
        .catch((error) => {
            console.log(error);
        });


    let data = qs.stringify({
        'csrf_token': csrf,
        'action': 'enter',
        'ftaa': ftaa,
        'bfaa': bfaa,
        'handleOrEmail': secret.handleOrEmail,
        'password': secret.password,
        '_tta': '91'
    });

    let config2 = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://codeforces.com/enter',
        headers: {
            'authority': 'codeforces.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.6',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'JSESSIONID=0713344E6F4EFAD83C53037D034DD31A; 39ce7=CF3ELQWz; evercookie_png=o7wb5akk3trvld10bn; evercookie_etag=o7wb5akk3trvld10bn; evercookie_cache=o7wb5akk3trvld10bn; 70a7c28f3de=o7wb5akk3trvld10bn; lastOnlineTimeUpdaterInvocation=1698788521590; cf_clearance=J_yJ6QikJ.I0Zc3_idccCWOUJLwcFPUhOfaokN_gi3g-1698793050-0-1-9782c615.9e1166fc.c08399f5-0.2.1698793050; X-User=; X-User-Sha1=; 39ce7=CF16rAxW; JSESSIONID=EC742EAF145E533D5CF731BD882CFB91; X-User=; X-User-Sha1=',
            'origin': 'https://codeforces.com',
            'pragma': 'no-cache',
            'referer': 'https://codeforces.com/enter',
            'sec-ch-ua': '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'sec-gpc': '1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
        },
        data: data
    };


    axios.request(config2)
        .then((response) => {
            console.log(response.status);
        })
        .catch((error) => {
            console.log(error);
        });

}


main()
