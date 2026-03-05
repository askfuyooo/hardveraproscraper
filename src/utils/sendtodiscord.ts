import { Listing } from "../types/types";

const GetEmbedBodyJSONString = (e: Listing): string => {
    const colors = {
        red: 0xff0000,
        orange: 0xffa500,
        green: 0x00ff00
    }

    const pickedColor = colors.green; //temp

    const body = {
        "content": "@here Új hírdetés a HardverAprón!",
        "embeds": [
            {
                "title": e.title,
                "url": e.url,
                "color": pickedColor,
                "fields": [
                    {
                        "name": "Ár",
                        "value": e.price,
                        "inline": true
                    },
                    {
                        "name": "Értékelések",
                        "value": `+${e.seller.rating.positive} / -${e.seller.rating.negative}`,
                        "inline": true
                    }
                ],
                "author": {
                    "name": e.seller.name
                },
                "footer": {
                    "text": "HardverAproBot by Fuyooo"
                },
                "thumbnail": {
                    "url": e.imageUrl
                },
                "timestamp": new Date().toISOString()
            }
        ],
    }

    return JSON.stringify(body);
}

const SendListingToDiscord = async (e: Listing, webhookUrl: string): Promise<void> => {
    await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: GetEmbedBodyJSONString(e)
    });
}

export default SendListingToDiscord;