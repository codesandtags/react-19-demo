const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function priceConverter(price) {
  return intl.format(price);
}
