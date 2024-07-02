import { JSDOM } from 'jsdom';

/**
 * fetch and parse the html of the `currentURL`
 * @param {string} baseURL starting url 
 * @param {string} currentUrl url being crawled
 * @param {Object} pages keeps count of internal links 
 * @returns updated `pages`
 */
async function crawlPage(baseURL, currentUrl = baseURL, pages = {}) {
    if (!isSameDomain(baseURL, currentUrl)) {
        return pages;
    }
    const normalURL = normalizeURL(currentUrl);
    if (normalURL in pages) {
        pages[normalURL]++;
        return pages;
    }
    pages[normalURL] = 1;
    console.log(`crawling ${currentUrl}...`)
    let html;
    try {
        html = await fetchHTML(currentUrl);
    } catch (error) {
        console.log(`Error ${error.message}`);
        return pages;   
    }
    const links = getURLsFromHTML(html, baseURL);
    let newPages = pages;
    for (const link of links) {
        newPages = await crawlPage(baseURL, link, newPages);
    }
    return newPages;
}
/**
 * Compares the domains of given urls
 * @param {string} baseURL base url
 * @param {string} url url being compared
 * @returns true if both urls have same domain
 */
function isSameDomain(baseURL, url) {
    const base = new URL(baseURL);
    const other = new URL(url);
    return base.hostname === other.hostname;
}

/**
 * fetches html given url
 * @param {string} url url where html is being fetched
 * @returns
 */
async function fetchHTML(url) {
    let response;
    try {
        response = await fetch(url);
    } catch (error) {
        throw new Error(`Network Error: ${error.message}`);
    }

    if (response.status >= 400) {
        console.log(`HTTP status code error: ${response.status} - ${response.statusText}`);
        return;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
        console.log(`incorrect content type: ${contentType}`);
        return;
    }
    return response.text();
}

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

export { normalizeURL, getURLsFromHTML, crawlPage };