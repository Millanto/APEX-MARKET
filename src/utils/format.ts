/**
 * Formats a numeric price into Ghana Cedis (GH₵) with thousand separators.
 */
export function formatPrice(price: number): string {
  return `GH₵${price.toLocaleString('en-GH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
