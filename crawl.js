import { JSDOM } from 'jsdom';

/**
 * @param {string} url
 * @returns {string} 
 */
function normalizeURL(url) {
    const myURL = new URL(url);
    let normal = `${myURL.hostname}${myURL.pathname}`;
    if (normal.slice(-1) === "/") {
        normal = normal.slice(0, -1);
    }
    return normal;
}
/**
 * extracts url links from html
 * @param {string} htmlBody
 * @param {string} baseURL 
 * @returns {string[]}
 */
function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const aElements = dom.window.document.querySelectorAll('a');
    const urls = []
    for (const element of aElements) {
        if (element.href) {
            try {
                const url = new URL(element.href, baseURL);
                const href = url.href;
                urls.push(href);

            } catch (error) {
                console.log(error.message, `: ${element}`);
            }
        }
    }
    return urls;
}

export { normalizeURL, getURLsFromHTML };