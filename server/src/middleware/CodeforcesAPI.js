const axios = require('axios');
const qs = require('qs');
const fs = require('fs').promises;
const cheerio = require('cheerio');
const tough = require('tough-cookie');
const CookieJar = tough.CookieJar;
const Cookie = tough.Cookie;


class CodeforcesAPI {

    #cookieJar // storing and managing cookies here
    #handle
    #handleOrEmail
    #password
    #csrf
    #ftaa
    #bfaa
    #lastSubmission
    #host

    constructor(handle, handleOrEmail, password) {
        this.#cookieJar = new CookieJar()
        this.#handle = handle
        this.#handleOrEmail = handleOrEmail
        this.#password = password
        this.#host = 'codeforces.com'
    }

    async login() {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://codeforces.com/enter',
            headers: {
                'authority': 'codeforces.com',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'accept-language': 'en-US,en;q=0.6',
                'cache-control': 'no-cache',
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

        await axios.request(config)
            .then((response) => {
                console.log("get #01:", response.status, ' Getting Cookies')
                const setCookieHeaders = response.headers['set-cookie'];
                if (setCookieHeaders) {
                    setCookieHeaders.forEach(setCookieHeader => {
                        const cookie = Cookie.parse(setCookieHeader, { loose: true });
                        this.#cookieJar.setCookieSync(cookie, 'http://codeforces.com');
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });




        config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://codeforces.com/enter',
            headers: {
                'authority': 'codeforces.com',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'accept-language': 'en-US,en;q=0.6',
                'cache-control': 'no-cache',
                'cookie': this.#cookieJar.getCookieStringSync('http://codeforces.com'),
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

        let res
        await axios.request(config).then((response) => {
            res = response.data
            console.log('get #02:', response.status, 'Getting csrf, ftaa and bfaa')

            const setCookieHeaders = response.headers['set-cookie'];
            if (setCookieHeaders) {
                setCookieHeaders.forEach(setCookieHeader => {
                    const cookie = Cookie.parse(setCookieHeader, { loose: true });
                    this.#cookieJar.setCookieSync(cookie, 'http://codeforces.com');
                });
            }

        }).catch((error) => {
            console.log(error);
        });


        let csfr = this.#parseCsrf(res)
        let ftaa = this.#parseFtaa(res)
        let bfaa = this.#parseBfaa(res)


        const qs = require('qs');
        let data = qs.stringify({
            'csrf_token': csfr,
            'action': 'enter',
            'ftaa': ftaa,
            'bfaa': bfaa,
            'handleOrEmail': this.#handleOrEmail,
            'password': this.#password,
            '_tta': '91'
        });

        config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://codeforces.com/enter',
            headers: {
                'authority': 'codeforces.com',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'accept-language': 'en-US,en;q=0.6',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': this.#cookieJar.getCookieStringSync('http://codeforces.com'),
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

        await axios.request(config)
            .then((response) => {
                console.log('post #03:', response.status, 'loging in');
                this.#findHandle(response.data)

                const setCookieHeaders = response.headers['set-cookie'];
                if (setCookieHeaders) {
                    setCookieHeaders.forEach(setCookieHeader => {
                        const cookie = Cookie.parse(setCookieHeader, { loose: true });
                        this.#cookieJar.setCookieSync(cookie, 'http://codeforces.com');
                    });
                }

                console.log('Cookies: ', this.#cookieJar.getCookieStringSync('http://codeforces.com'))
            })
            .catch((error) => {
                console.log(error);
            });
    }




    async submit(filePath) {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://codeforces.com/problemset/submit',
            headers: {
                'authority': 'codeforces.com',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'accept-language': 'en-US,en;q=0.6',
                'cache-control': 'no-cache',
                'cookie': this.#cookieJar.getCookieStringSync('http://codeforces.com'),
                'pragma': 'no-cache',
                'referer': 'https://codeforces.com/problemset/problem/1891/F',
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
            }
        };


        let csrf
        let ftaa
        let bfaa

        await axios.request(config)
            .then((response) => {
                console.log('submit #1:', response.status);

                const setCookieHeaders = response.headers['set-cookie'];
                if (setCookieHeaders) {
                    setCookieHeaders.forEach(setCookieHeader => {
                        const cookie = Cookie.parse(setCookieHeader, { loose: true });
                        this.#cookieJar.setCookieSync(cookie, 'http://codeforces.com');
                    });
                }

                csrf = this.#parseCsrf(response.data)
                ftaa = this.#parseFtaa(response.data)
                bfaa = this.#parseBfaa(response.data)

            })
            .catch((error) => {
                console.log(error);
            });



        const code = await this.#readFileToString(filePath)

        let uData = {
            'csrf_token': csrf,
            'ftaa': ftaa,
            'bfaa': bfaa,
            'action': 'submitSolutionFormSubmitted',
            'contestId': '1891',
            'submittedProblemIndex': 'F',
            'programTypeId': '54',
            'source': '',
            'tabSize': '4',
            'sourceFile': '',
            '_tta': '372'
        }

        console.log(code)
        uData['source'] = code
        console.log('helo')

        let data = qs.stringify(uData);

        console.log(data)

        

        config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://codeforces.com/problemset/submit?csrf_token=${csrf}`,
            headers: {
                'authority': 'codeforces.com',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'accept-language': 'en-US,en;q=0.6',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': this.#cookieJar.getCookieStringSync('http://codeforces.com'),
                'origin': 'https://codeforces.com',
                'pragma': 'no-cache',
                'referer': 'https://codeforces.com/problemset/submit',
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

        axios.request(config)
            .then((response) => {
                console.log('post submission #2', response.status);

                const setCookieHeaders = response.headers['set-cookie'];
                if (setCookieHeaders) {
                    setCookieHeaders.forEach(setCookieHeader => {
                        const cookie = Cookie.parse(setCookieHeader, { loose: true });
                        this.#cookieJar.setCookieSync(cookie, 'http://codeforces.com');
                    });
                }


            })
            .catch((error) => {
                console.log(error);
            });
    }




    async #readFileToString(filePath) {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const formattedContent = data.split('\n').map(line => line.trim()).join('\n');
            return formattedContent;
        } catch (err) {
            throw err;
        }
    }


    #findHandle(data) {
        for (let i = 0; i < data.length; i++) {
            if (data.charAt(i) == this.#handle.charAt(0)) {
                let found = true; // Assume a match until proven otherwise
                for (let j = 1; j < this.#handle.length; j++) {
                    if (data.charAt(i + j) !== this.#handle.charAt(j)) {
                        found = false;
                        break;
                    }
                }
                if (found) {
                    console.log('Welcome,', this.#handle);
                    return
                }
            }
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

module.exports = CodeforcesAPI