const phpCurrencyFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export function formatPhpCurrency(value) {
  const amount = Number(value);
  return phpCurrencyFormatter.format(Number.isFinite(amount) ? amount : 0);
}
