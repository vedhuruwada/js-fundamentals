let coins = [];

const fetchCoins = async () => {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1');
    coins = await res.json();
    renderCoins(coins);
}

const renderCoins = (coins) => {
    const coinsUl = document.getElementById('coinList');
    coins.forEach((coin) => {
        const coinLi = document.createElement('li');
        coinLi.innerHTML = `
            ${coin.name} - $${coin.current_price}
            <button onclick="showDetails('${coin.id}')">Details</button>
        `
        coinsUl.appendChild(coinLi)
    });
};

const showDetails = (id) => {
    const coinDetails = coins.find(c => c.id === id);
    const details = document.getElementById('details');
    details.innerHTML = `
        <h3> ${coinDetails.name} (${coinDetails.symbol.toUpperCase()}) </h3>
        <img src="${coinDetails.image}" width="50" />
        <p> Current Price : $${coinDetails.current_price} </p>
        <p> Market Cap: $${coinDetails.market_cap.toLocaleString()} </p>
    `
}

fetchCoins();

