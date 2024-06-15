import { crawlPage } from "./crawl.js";

function sortPages(pages) {
  return Object.entries(pages).sort(([, a], [, b]) => b - a);
}

function generateReport(pages) {
  console.log("Report is starting...");
  const sortedPages = sortPages(pages);

  for (const page of sortedPages) {
    console.log(`Found ${page[1]} internal links to ${page[0]}`);
  }
}

async function main() {
  const args = process.argv.length;

  if (args != 3) {
    console.log("Wrong arguments number");
    console.log("Usage: npm run start BASE_URL");
    return;
  }

  const inputUrl = process.argv[2];
  let baseUrl;

  try {
    baseUrl = new URL(inputUrl);
  } catch (error) {
    console.log("The input is not a valid url");
    return;
  }

  console.log(`Using ${inputUrl} as start`);
  const pages = await crawlPage(inputUrl, inputUrl, {});
  generateReport(pages);
}

await main();
