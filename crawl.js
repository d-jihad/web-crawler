export function normalizeURL(url) {
  if (url.startsWith("http://")) {
    url = url.substr("http://".length);
  } else if (url.startsWith("https://")) {
    url = url.substr("https://".length);
  }

  if (url.endsWith("/")) {
    url = url.substr(0, url.length - 1);
  }

  return url;
}
