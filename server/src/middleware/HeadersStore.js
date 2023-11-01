


class HeadersStore {

    #store = {}

    constructor() {
        this.#store['gethttps://codeforces.com/enter'] = {
            'authority': 'codeforces.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.6',
            'cache-control': 'no-cache',
            //'cookie': 'JSESSIONID=0713344E6F4EFAD83C53037D034DD31A; 39ce7=CF3ELQWz; evercookie_png=o7wb5akk3trvld10bn; evercookie_etag=o7wb5akk3trvld10bn; evercookie_cache=o7wb5akk3trvld10bn; 70a7c28f3de=o7wb5akk3trvld10bn; lastOnlineTimeUpdaterInvocation=1698788521590; X-User=; cf_clearance=byIz4MmNVulD1zrQ0agYhe0hmuVRQ9xhI7FfvYh2waM-1698798738-0-1-9782c615.fce71e2.c08399f5-0.2.1698798738; X-User-Sha1=; 39ce7=CF16rAxW; JSESSIONID=EC742EAF145E533D5CF731BD882CFB91; X-User-Sha1=',
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

        this.#store['posthttps://codeforces.com/enter'] = {
            'authority': 'codeforces.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.6',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            //'cookie': 'JSESSIONID=0713344E6F4EFAD83C53037D034DD31A; 39ce7=CF3ELQWz; evercookie_png=o7wb5akk3trvld10bn; evercookie_etag=o7wb5akk3trvld10bn; evercookie_cache=o7wb5akk3trvld10bn; 70a7c28f3de=o7wb5akk3trvld10bn; lastOnlineTimeUpdaterInvocation=1698788521590; cf_clearance=J_yJ6QikJ.I0Zc3_idccCWOUJLwcFPUhOfaokN_gi3g-1698793050-0-1-9782c615.9e1166fc.c08399f5-0.2.1698793050; X-User=; X-User-Sha1=; 39ce7=CF16rAxW; JSESSIONID=EC742EAF145E533D5CF731BD882CFB91; X-User=; X-User-Sha1=',
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
        }

        this.#store['gethttps://codeforces.com/profile'] = { 
            'authority': 'codeforces.com', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8', 
            'accept-language': 'en-US,en;q=0.6', 
            'cache-control': 'no-cache', 
            //'cookie': 'lastOnlineTimeUpdaterInvocation=1698801481590; JSESSIONID=0713344E6F4EFAD83C53037D034DD31A; 39ce7=CF3ELQWz; evercookie_png=o7wb5akk3trvld10bn; evercookie_etag=o7wb5akk3trvld10bn; evercookie_cache=o7wb5akk3trvld10bn; 70a7c28f3de=o7wb5akk3trvld10bn; X-User=; cf_clearance=6tBpIuuOd70E8NwtAKaTBF95G6JuhSN9lB.NN4UdoWw-1698874538-0-1-9782c615.5869890c.c08399f5-0.2.1698874538; X-User-Sha1=3b15b39162f8d12117ae98df132690d297b42563; lastOnlineTimeUpdaterInvocation=1698874547565; 39ce7=CFy6pJ7K; JSESSIONID=B3E7799C2BEDA4FE8015CEC6DC46CABF; X-User=', 
            'pragma': 'no-cache', 
            'referer': 'https://codeforces.com/', 
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
    }

    getHeaders(method, url) {
        return this.#store[method + url]
    }

    sotreHeaders(method, url, headers) {
        this.#store[method + url] = headers
    }




}

module.exports = HeadersStore;