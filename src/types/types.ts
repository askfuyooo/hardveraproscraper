type Seller = {
    name: string,
    rating: {
        positive: number,
        negative: number
    }
}

type Listing = {
    title: string,
    price: string,
    imageUrl: string,
    timestamp: string,
    seller: Seller,
    url: string
}

export type {
    Seller,
    Listing
}