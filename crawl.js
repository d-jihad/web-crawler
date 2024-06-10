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
