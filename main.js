import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
    const cliArguments = process.argv.slice(2);
    if (cliArguments.length < 1) {
        console.log("Error: No arguments given.");
        return;
    }
    if (cliArguments.length > 1) {
        console.log("Error: Too many arguments given.");
        return;
    }
    const baseURL = cliArguments[0];
    console.log(`Starting crawling with base: ${baseURL}`);
    const pages = await crawlPage(baseURL);
    printReport(pages);
}

main();