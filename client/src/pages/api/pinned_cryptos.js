export default function handler(req, res) {
    const pinnedCryptos = [
        {
            id: "Ethereum",
            name: "Ethereum",
            token: "ETH",
            price: 70,
            icon: "./cryptos/eth.svg"
        },
        {
            id: "Dai Stablecoin",
            name: "Dai Stablecoin",
            token: "DAI",
            price: 80,
            icon: "./cryptos/dai.svg"
        },
        {
            id: "USD Coin",
            name: "USD Coin",
            token: "USDC",
            price: 90,
            icon: "./cryptos/usdc.svg"
        },
        {
            id: "Tether USD",
            name: "Tether USD",
            token: "USDT",
            price: 1,
            icon: "./cryptos/usdt.svg"
        },
        {
            id: "Wrapped BTC",
            name: "Wrapped BTC",
            token: "WBTC",
            price: 100,
            icon: "./cryptos/wbtc.svg"
        },
        {
            id: "Wrapped Ether",
            name: "Wrapped Ether",
            token: "WETH",
            price: 70,
            icon: "./cryptos/etc.svg"
        }
    ];

    res.status(200).json(pinnedCryptos);
}
