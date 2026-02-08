import { BrowserContext, Page } from "playwright";

interface Params {
  // No params needed for ping
}

export default async function handler(
  params: Params,
  page: Page,
  context: BrowserContext
) {
  return {
    status: "ok",
    message: "pong",
    timestamp: new Date().toISOString(),
  };
}
