import { BrowserContext, Page } from "playwright";

// Sample handler - define your parameters and implement your scraping logic here
interface Params {
  // Add your params here
}

export default async function handler(
  params: Params,
  page: Page,
  context: BrowserContext
) {
  return {};
}
