import { JSDOM } from "jsdom";

export function normalizeURL(url) {
  let isUrl = false;
  if (url.startsWith("http://")) {
    url = url.substr("http://".length);
    isUrl = true;
  } else if (url.startsWith("https://")) {
    url = url.substr("https://".length);
    isUrl = true;
  }

  if (isUrl && url.endsWith("/")) {
    url = url.substr(0, url.length - 1);
  }

  return url;
}

export function getURLsFromHTML(html, baseURL) {
  const urls = [];
  const dom = new JSDOM(html);
  const anchors = dom.window.document.querySelectorAll("a");

  for (const anchor of anchors) {
    if (anchor.hasAttribute("href")) {
      let href = anchor.getAttribute("href");

      try {
        href = new URL(href, baseURL).href;
        urls.push(href);
      } catch (err) {
        console.log(`${err.message}: ${href}`);
      }
    }
  }

  return urls;
}

function hasSameHostname(firstURL, secondURL) {
  try {
    const firstHostname = new URL(firstURL).hostname;
    const secondHostname = new URL(secondURL).hostname;

    return firstHostname === secondHostname;
  } catch (error) {
    return false;
  }
}

async function fetchHTML(url) {
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error(`Got Network error: ${err.message}`);
  }

  if (res.status > 399) {
    console.log(`Got HTTP error: ${res.status} ${res.statusText} on ${url}`);
    return;
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    console.log(`content-type error: expected text/html got ${contentType}`);
    return;
  }

  return await res.text();
}

export async function crawlPage(currentUrl, baseUrl, pages) {
  if (!hasSameHostname(currentUrl, baseUrl)) {
    return pages;
  }

  const normalizedUrl = normalizeURL(currentUrl);

  if (normalizedUrl in pages) {
    pages[normalizedUrl] += 1;
    return pages;
  }

  pages[normalizedUrl] = 1;

  const pageBody = await fetchHTML(currentUrl);
  if (!pageBody) {
    return pages;
  }

  const urls = getURLsFromHTML(pageBody, baseUrl);

  for (const url of urls) {
    pages = await crawlPage(url, baseUrl, pages);
  }

  return pages;
}
