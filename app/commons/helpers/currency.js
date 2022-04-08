export const formatCurrency = (currency, value = 0) => {
  return `${currency} ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};
