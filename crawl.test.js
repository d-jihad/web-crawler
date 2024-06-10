import { test, expect } from "@jest/globals";
import { getURLsFromHTML, normalizeURL } from "./crawl";

test("https URL normalization", () => {
  expect(normalizeURL("https://en.wikipedia.org/path/")).toBe(
    "en.wikipedia.org/path"
  );
});

test("http URL normalization", () => {
  expect(normalizeURL("http://en.wikipedia.org/path/")).toBe(
    "en.wikipedia.org/path"
  );
});

test("URL normalization", () => {
  expect(normalizeURL("https://en.wikipedia.org/path")).toBe(
    "en.wikipedia.org/path"
  );
});

test("Invalid URL", () => {
  expect(normalizeURL("file://index.html/")).toBe("file://index.html/");
});

test("Link extraction", () => {
  const htmlBody = `
  <html>
    <body>
      <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
      <a href="/courses"><span>Go to courses</span></a>
      <a href="https://en.wikipedia.org"><span>Go to Boot.dev</span></a>
    </body>
  </html>
  `;

  const baseUrl = "https://boot.dev";

  expect(getURLsFromHTML(htmlBody, baseUrl)).toEqual([
    "https://blog.boot.dev/",
    "https://boot.dev/courses",
    "https://en.wikipedia.org/",
  ]);
});
