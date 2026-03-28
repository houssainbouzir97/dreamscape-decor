/**
 * PROMOTION CONFIGURATION
 * ─────────────────────────────────────────────────────────────────
 * To activate a promotion, set `active: true` and configure below.
 * To deactivate, set `active: false` — no other file needs changing.
 *
 * Future usage examples:
 *   Eid Sale:       { active: true, name: "Eid", label: "Eid Al-Adha", discountPercentage: 15, emoji: "🌟" }
 *   Summer Sale:    { active: true, name: "Summer", label: "Soldes Été", discountPercentage: 10, emoji: "☀️" }
 *   No promotion:   { active: false, ... }
 * ─────────────────────────────────────────────────────────────────
 */

export interface PromotionConfig {
  active: boolean;
  name: string;         // Internal identifier
  label: string;        // Display name shown in UI
  emoji: string;        // Emoji for banner
  discountPercentage: number;
  bannerText?: string;  // Optional custom banner text (auto-generated if omitted)
}

export const PROMOTION: PromotionConfig = {
  active: true,
  name: "Printemps2026",
  label: "Printemps",
  emoji: "✨",
  discountPercentage: 20,
};

/**
 * Calculate the discounted price for a given base price.
 * Always rounds to nearest integer for clean display.
 */
export function getDiscountedPrice(basePrice: number): number {
  return Math.round(basePrice * (1 - PROMOTION.discountPercentage / 100));
}

/**
 * Returns the effective price — discounted if promotion active, base otherwise.
 */
export function getEffectivePrice(basePrice: number): number {
  return PROMOTION.active ? getDiscountedPrice(basePrice) : basePrice;
}

/**
 * Badge label on product cards (above image, does not use PROMOTION.label — set wording here).
 */
export function getPromotionBadgeLabel(): string {
  return `-${PROMOTION.discountPercentage}% sur toute la collection`;
}

/**
 * Full banner text shown above the hero section.
 */
export function getBannerText(): string {
  return (
    PROMOTION.bannerText ??
    `${PROMOTION.emoji} Offre spéciale ${PROMOTION.label} – ${PROMOTION.discountPercentage}% de réduction sur toute la collection`
  );
}
