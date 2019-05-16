/* Use https://cors.io/? to fix http/https limitation */ 
const FIXER_ENDPOINT = "https://cors.io/?http://data.fixer.io/api/latest?access_key=5e2e34b6141b185a648f1be0c2a84530&symbols=UAH,PLN,USD";

let cachedRates = null;

async function getRates() {
  let response = await fetch(FIXER_ENDPOINT);
  let result = await response.json();
  return result;
}

function calculateReport(rates, items, targetCurrency) {
  let total = 0;
  for (let item of items) {
    let price = parseFloat(item.price);
    
    // fixer free plan doesn't allow changing base
    if (targetCurrency === "EUR") {
      if (item.currency !== rates.base) {
        price = price / rates.rates[item.currency];
      }
    } else {
      price = (price / rates.rates[item.currency]) * rates.rates[targetCurrency];
    }
    total += price;
  }
  return total;
}

export async function prepareReport(items, targetCurrency){
  if (!cachedRates) {
    cachedRates =  await getRates();
  }
  return calculateReport(cachedRates, items, targetCurrency);
}