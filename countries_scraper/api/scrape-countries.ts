import { BrowserContext, Page } from "playwright";

interface Params {
  // No params needed for this scraper
}

export default async function handler(
  params: Params,
  page: Page,
  context: BrowserContext
) {
  // Navigate to the target URL
  await page.goto("https://www.scrapethissite.com/pages/simple/");

  // Wait for the country elements to load
  await page.waitForSelector("h3.country-name");

  // Extract all country names from h3 elements
  const countries = await page.$$eval("h3.country-name", (elements) => {
    return elements.map((el) => el.textContent?.trim() || "");
  });

  // Return the array of country names
  return {
    countries: countries,
    count: countries.length,
  };
}
