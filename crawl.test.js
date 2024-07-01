import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('testing normalizeURL', () => {
    const normalURL = "blog.boot.dev/path";
    const url1 = "https://blog.boot.dev/path/";
    expect(normalizeURL(url1)).toBe(normalURL);
    const url2 = "https://blog.boot.dev/path";
    expect(normalizeURL(url2)).toBe(normalURL);
    const url3 = "http://blog.boot.dev/path/";
    expect(normalizeURL(url3)).toBe(normalURL);
    const url4 = "http://blog.boot.dev/path";
    expect(normalizeURL(url4)).toBe(normalURL);
    const url5 = "http://BLOG.boot.dev/path";
    expect(normalizeURL(url5)).toBe(normalURL);
});

test('testing getURLsFromHTML', () => {
    const htmlBody = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/lessons/1"><span>Go to Boot.dev</span></a>
        <a href="https://www.example.com"><span>Go to Boot.dev</span></a>
        <a> no href </a>
    </body>
    </html>`;
    const baseURL = "https://blog.boot.dev";
    const urls = getURLsFromHTML(htmlBody, baseURL);
    const expected = [
        "https://blog.boot.dev/",
        "https://blog.boot.dev/lessons/1",
        "https://www.example.com/",
    ]
    expect(urls).toEqual(expected);
});