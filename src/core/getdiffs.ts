import { config } from "dotenv"; config({ quiet: true });
import GetListings from './getlistings';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { Listing } from "../types/types";
const { STATE_FILE, ENCODING } = process.env;

const stateFilePath: string = STATE_FILE || ".state.json";
const encoding: BufferEncoding = ENCODING as BufferEncoding || "utf-8";

const GetDifferences = async (): Promise<Listing[]> => {
    const hasState = existsSync(stateFilePath);
    let stateListings = [] as Listing[];
    if (hasState)
        stateListings = JSON.parse(readFileSync(stateFilePath, encoding)) as Listing[];

    const listings = await GetListings();
    if (!hasState || stateListings.length === 0)
        stateListings = listings;

    writeFileSync(stateFilePath, JSON.stringify(listings, null, 4), encoding);

    return listings.filter((l) =>
        !stateListings.some((sl) => sl.title === l.title && sl.seller.name === l.seller.name));
}

export default GetDifferences;