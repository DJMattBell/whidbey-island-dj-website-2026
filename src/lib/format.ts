/**
 * Format a price stored in cents as a display string.
 *
 * @example formatPrice(210000) → "$2,100"
 * @example formatPrice(0)      → "$0"
 * @example formatPrice(1500)   → "$15"
 * @example formatPrice(15099)  → "$150.99"
 */
export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return dollars % 1 === 0
    ? `$${dollars.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
    : `$${dollars.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
