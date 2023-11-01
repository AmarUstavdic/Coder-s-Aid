const axios = require('axios')
const qs = require('qs');
const cheerio = require('cheerio');
const tough = require('tough-cookie');
const CookieJar = tough.CookieJar;
const HeadersStore = require('./HeadersStore')


class Client {

    #hs
    #cookieJar
    #handle
    #handleOrEmail
    #password
    #csrf
    #ftaa
    #bfaa
    #lastSubmission
    #host
    #proxy
    #path

    constructor(handle, handleOrEmail, password) {
        this.#hs = new HeadersStore()
        this.#cookieJar = new CookieJar()
        this.#handle = handle
        this.#handleOrEmail = handleOrEmail
        this.#password = password
        this.#csrf = ''
        this.#ftaa = ''
        this.#bfaa = ''
        this.#lastSubmission = ''
        this.#host = 'codeforces.com'
        this.#proxy = ''
        this.#path = '/enter'
    }

    async isLoggedIn() {
        const headers = this.#hs.getHeaders('get', 'https://codeforces.com/profile')

        /*
        await this.#buildCookieString('https://codeforces.com')
            .then(cookieString => {
                headers['cookie'] = cookieString;
            })
            .catch(error => {
                console.error(error);
            });

        console.log(headers)
        */

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://codeforces.com/profile/${this.#handle}`,
            headers: headers
        }

        await axios.request(config)
            .then((response) => {

                const setCookieHeaders = response.headers['set-cookie'];
                this.#storeCookies(setCookieHeaders, 'https://codeforces.com')

                const $ = cheerio.load(response.data);
                const link = $('a[href="/settings/general"]');
                const regex = `^${this.#handle}$`;
                const match = response.data.match(regex);

                if (link > 0 && match) {
                    console.log('User is logged in')
                } else {
                    console.log('User is NOT logged in')
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async login() {
        await this.#getTokens()

        let data = qs.stringify({
            'csrf_token': this.#csrf,
            'action': 'enter',
            'ftaa': this.#ftaa,
            'bfaa': this.#bfaa,
            'handleOrEmail': this.#handleOrEmail,
            'password': this.#password,
            '_tta': '91'
        });

        const headers = this.#hs.getHeaders('post', 'https://codeforces.com/enter')
        await this.#buildCookieString('https://codeforces.com')
            .then(cookieString => {
                headers['cookie'] = cookieString;
            })
            .catch(error => {
                console.error(error);
            });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://codeforces.com/enter',
            headers: headers,
            data: data
        };

        await axios.request(config)
            .then((response) => {
                const setCookieHeader = response.headers['set-cookie'];
                this.#storeCookies(setCookieHeader, 'https://codeforces.com')
                console.log(response.status);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async #getTokens() {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://codeforces.com/enter',
            headers: this.#hs.getHeaders('get', 'https://codeforces.com/enter')
        }

        await axios.request(config)
            .then((response) => {

                //const setCookieHeaders = response.headers['set-cookie'];
                //this.#storeCookies(setCookieHeaders, 'https://codeforces.com')

                this.#csrf = this.#parseCsrf(response.data)
                this.#ftaa = this.#parseFtaa(response.data)
                this.#bfaa = this.#parseBfaa(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    #buildCookieString(url) {
        return new Promise((resolve, reject) => {
            this.#cookieJar.getCookies(url, (err, cookies) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    const cookieStrings = cookies.map(cookie => cookie.toString());
                    const allCookiesString = cookieStrings.join('; ');
                    resolve(allCookiesString);
                }
            });
        });
    }

    #storeCookies(setCookieHeaders, url) {
        if (Array.isArray(setCookieHeaders)) {
            setCookieHeaders.forEach(setCookieHeader => {
                const cookie = tough.parse(setCookieHeader);

                this.#cookieJar.setCookie(cookie, url, (err, cookie) => {
                    if (err) console.error(err);
                });
            });
        } else if (setCookieHeaders) {
            const cookie = tough.parse(setCookieHeaders);
            this.#cookieJar.setCookie(cookie, url, (err, cookie) => {
                if (err) console.error(err);
            });
        } else {
            console.log('No Set-Cookie header found in the response.');
        }
    }

    #parseCsrf(data) {
        const $ = cheerio.load(data)
        const csrfToken = $('.csrf-token').attr('data-csrf')
        return csrfToken
    }

    #parseFtaa(data) {
        const ftaaRegex = /window\._ftaa\s*=\s*"([^"]+)"/
        const ftaaMatch = data.match(ftaaRegex)
        const ftaaValue = ftaaMatch ? ftaaMatch[1] : ''
        return ftaaValue
    }

    #parseBfaa(data) {
        const bfaaRegex = /window\._bfaa\s*=\s*"([^"]+)"/
        const bfaaMatch = data.match(bfaaRegex)
        const bfaaValue = bfaaMatch ? bfaaMatch[1] : ''
        return bfaaValue
    }
}

module.exports = Client