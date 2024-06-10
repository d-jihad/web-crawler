import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl";

test("https URL normalization", () => {
  expect(normalizeURL("https://en.wikipedia.org/path/")).toBe("en.wikipedia.org/path");
});

test("http URL normalization", () => {
  expect(normalizeURL("http://en.wikipedia.org/path/")).toBe("en.wikipedia.org/path");
});

test("URL normalization", () => {
  expect(normalizeURL("https://en.wikipedia.org/path")).toBe("en.wikipedia.org/path");
});
