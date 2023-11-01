const axios = require('axios')
const util = require('../../../util/util')
const tough = require('tough-cookie');
const CookieJar = tough.CookieJar;


class Client {

    constructor(handle, password, handleOrEmail) {
        this.cookieJar = new CookieJar()
        this.handle = handle
        this.handleOrEmail = handleOrEmail
        this.password = password
        this.csrf = ''
        this.ftaa = ''
        this.bfaa = ''
        this.lastSubmission = ''
        this.host = 'codeforces.com'
        this.proxy = ''
        this.path = '/enter'
    }

    isLoggedIn() {

        return false
    }

    async login() {
        if (!this.isLoggedIn()) {
            await this.#initialRequest()
        }

        const form = {
            'csrf_token': this.csrf,
            'action': 'enter',
            'ftaa': this.ftaa,
            'bfaa': this.bfaa,
            'handleOrEmail': this.handleOrEmail,
            'password': this.password,
            '_tta': '91',
            'remember': 'on',
        }

        if (form.ftaa == '') {
            form.ftaa = util.rndString(18)
        }
        if (form.bfaa == '') {
            form.bfaa = '5c4ff8fb91636746a2f06f8ce404b90a'
        }

        console.log("ftaa: ", form.ftaa)
        console.log("bfaa: ", form.bfaa)
        console.log("csrf: ", form.csrf_token)
        //console.log("cookie: ", this.cookieJar)

        
        let cookieString
        this.cookieJar.getCookies('https://codeforces.com', (error, cookies) => {
            if (error) {
                console.error(error);
            } else { 
                cookieString = cookies.toString()
            }
        });
    

        const headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.6',
            'Sec-Ch-Ua': '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Linux"',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Sec-Gpc': '1',

            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
            
            'Origin': 'https://codeforces.com',
            'Pragma': 'no-cache',
            'Referer': 'https://codeforces.com/enter',
            
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        }

        const res = await axios.post('https://codeforces.com/enter', form, {headers})

        
        console.log(res.data)

    }

    async #initialRequest() {
        const headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.7',
            'Sec-Ch-Ua': '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Linux"',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Sec-Gpc': '1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        }

        const res = await axios.get('https://codeforces.com/enter', { headers });
        this.ftaa = util.parseFtaa(res.data)
        this.bfaa = util.parseBfaa(res.data)
        this.csrf = util.parseCsrfToken(res.data)

        if (res.headers['set-cookie']) {
            res.headers['set-cookie'].forEach(cookie => {
                this.cookieJar.setCookieSync(cookie, 'https://codeforces.com');
            });
        }
    }

}

module.exports = Client