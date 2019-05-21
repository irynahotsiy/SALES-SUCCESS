/* Use https://jsonp.afeld.me/? to fix http/https limitation */
const FIXER_ENDPOINT = "https://jsonp.afeld.me/?url=http%3A%2F%2Fdata.fixer.io%2Fapi%2Flatest%3Faccess_key%3D5e2e34b6141b185a648f1be0c2a84530%26symbols%3DUAH%2CPLN%2CUSD";

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
      if (item.currency === "EUR") {
        price = price * rates.rates[targetCurrency];
      } else if (item.currency !== targetCurrency) {
        price = (price / rates.rates[item.currency]) * rates.rates[targetCurrency];
      }
    }
    total += price;
  }
  return total;
}


export async function prepareReport(items, targetCurrency) {
  if (!cachedRates) {
    cachedRates = await getRates();
  }
  return calculateReport(cachedRates, items, targetCurrency);
}