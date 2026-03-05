import { config } from "dotenv"; config({ quiet: true });
const { DISCORD_WEBHOOK_URL } = process.env;

if (!DISCORD_WEBHOOK_URL) {
    console.error("DISCORD_WEBHOOK_URL is not set. Please set it in the .env file.");
    process.exit(1);
}

import GetDifferences from "./core/getdiffs";
import SendListingToDiscord from "./utils/sendtodiscord";

const main = async () => {
    const diffs = await GetDifferences();

    console.log(`=====\nFound ${diffs.length} new listings.\n=====`);

    for (const diff of diffs)
        await SendListingToDiscord(diff, DISCORD_WEBHOOK_URL);
}

setInterval(main, 10 * 60 * 1000);
main().catch(() => {});