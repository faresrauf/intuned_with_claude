import { BrowserContext, Page } from "playwright";

interface Country {
  name: string;
  capital: string;
  population: number;
  area: number; // in km²
}

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

  // Extract all country data using evaluate to run in browser context
  const countries = await page.evaluate(() => {
    // Find all country containers
    const countryDivs = document.querySelectorAll("div.country");

    return Array.from(countryDivs).map((countryDiv) => {
      // Extract country name
      const nameElement = countryDiv.querySelector("h3.country-name");
      const name = nameElement?.textContent?.trim() || "";

      // Extract capital
      const capitalElement = countryDiv.querySelector("span.country-capital");
      const capital = capitalElement?.textContent?.trim() || "";

      // Extract population
      const populationElement = countryDiv.querySelector(
        "span.country-population"
      );
      const populationText = populationElement?.textContent?.trim() || "0";
      const population = parseInt(populationText.replace(/,/g, ""), 10) || 0;

      // Extract area
      const areaElement = countryDiv.querySelector("span.country-area");
      const areaText = areaElement?.textContent?.trim() || "0";
      const area = parseFloat(areaText.replace(/,/g, "")) || 0;

      return {
        name,
        capital,
        population,
        area,
      };
    });
  });

  console.log(`Successfully scraped ${countries.length} countries`);
  console.log("hi man");

  // Return the structured data
  return {
    countries: countries,
    count: countries.length,
    metadata: {
      source: "https://www.scrapethissite.com/pages/simple/",
      scrapedAt: new Date().toISOString(),
      fieldsIncluded: ["name", "capital", "population", "area"],
    },
  };
}
