import { config } from "dotenv"; config({ quiet: true });
import { JSDOM } from "jsdom";
import type { Seller, Listing } from "../types/types";
const { HARDVERAPRO_URL } = process.env;
if (!HARDVERAPRO_URL) {
    console.error("HARDVERAPRO_URL is not set. Please set it in the .env file.");
    process.exit(1);
}

const FetchAndGetDOM = async (url: string) => {
    const response = await fetch(url);
    const text = await response.text();
    const dom = new JSDOM(text);

    return dom.window.document;
}

const HTMLToObject = (e: Element): Listing => {
    const h1 = e.querySelector("div.uad-col-title > h1") ?? null;
    if (!h1 || h1.children.length !== 2) throw new Error("No h1 element found in listing!");

    return {
        title: h1.children[0].textContent?.trim() ?? "-UNKNOWN-",
        url: h1.children[0].getAttribute("href")?.trim() ?? "about:blank",
        timestamp: h1.children[1].textContent?.trim() ?? "-UNKNOWN-",
        price: e.querySelector("div.uad-price > span")?.textContent?.trim() ?? "-UNKNOWN-",
        imageUrl: `https:${e.querySelector("a.uad-image > img")?.getAttribute("src")?.trim() ?? "-UNKNOWN-"}`,
        seller: {
            name: e.querySelector("span.uad-user-text > a")?.textContent?.trim() ?? "-UNKNOWN-",
            rating: {
                positive: Number(e.querySelector("span.uad-rating-positive")?.textContent?.trim().replace("+", "") ?? 0),
                negative: Number(e.querySelector("span.uad-rating-negative")?.textContent?.trim().replace("-", "") ?? 0),
            }
        } as Seller
    } as Listing;
}

const GetListings = async (url: string = HARDVERAPRO_URL): Promise<Listing[]> => {
    const document = await FetchAndGetDOM(url);

    const containerElement = document.getElementsByClassName("slotFullContainer");
    if (containerElement.length !== 1) throw new Error("No or multiple slotFullContainer elements found!");

    const container = containerElement[0];
    const listingElements = container.querySelectorAll("li.media");

    const listings: Listing[] = [];
    listingElements.forEach(e => listings.push(HTMLToObject(e)));

    return listings;
}

export default GetListings;