import { test, expect } from "@jest/globals";
import { sortPages } from "./report";

test('testing sortPages', () => {
    const pages = {
        'example.com': 10,
        'example.com/tags': 1,
        'example.com/about': 2,
        'example.com/posts': 5,
    }
    const sortedPages = sortPages(pages);
    
    const expected = [
        {url: 'example.com', count: 10},
        {url: 'example.com/posts', count: 5},
        {url: 'example.com/about', count: 2},
        {url: 'example.com/tags', count: 1},
    ]
    expect(sortedPages).toEqual(expected);
});