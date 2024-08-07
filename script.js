document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'Y4cd7f212442c43e1b725fff5';
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;

    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert');
    const conversionResult = document.getElementById('conversion-result');
    const exchangeRateDisplay = document.getElementById('exchange-rate');

    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrencySelect.appendChild(option1);
                
                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrencySelect.appendChild(option2);
            });
        })
        .catch(error => console.error('Error fetching currencies:', error));

    
    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || !fromCurrency || !toCurrency) {
            conversionResult.textContent = 'Please fill out all fields.';
            return;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency] / data.rates[fromCurrency];
                const result = amount * rate;
                conversionResult.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
                exchangeRateDisplay.textContent = `Exchange Rate: 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
            })
            .catch(error => console.error('Error fetching exchange rates:', error));
    });
});
