function printReport(pages) {
    console.log("----------------- Report -----------------");
    const sortedPages = sortPages(pages);
    for (const {url, count} of sortedPages) {
        console.log(`Found ${count} internal links to ${url}`);
    }
    console.log("----------------- End Report -----------------");
}

function sortPages(pages) {
    const values = [];
    for (const [key, value] of Object.entries(pages)) {
        values.push({url: key,count: value});
    }
    values.sort((v1, v2) => v2.count - v1.count);
    return values
}

export {printReport, sortPages};