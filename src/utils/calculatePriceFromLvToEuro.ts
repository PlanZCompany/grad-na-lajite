export const priceToEuro = (price: number) => {
  const base = 1.96

  return (price / base).toFixed(2)
}
