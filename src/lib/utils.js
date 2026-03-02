/**
 * Utility functions for product calculations and formatting
 */

/**
 * Calculate discounted price
 * @param {number} price - Original price
 * @param {number} discount - Discount percentage
 * @returns {number} - Discounted price
 */
export function calculateDiscountedPrice(price, discount) {
    if (!price || !discount || discount <= 0) {
        return price;
    }
    return price - (price * discount) / 100;
}

/**
 * Format price with Bangladeshi Taka symbol
 * @param {number} price - Price to format
 * @returns {string} - Formatted price string
 */
export function formatPrice(price) {
    return `৳${Math.round(price)}`;
}

/**
 * Calculate savings amount
 * @param {number} price - Original price
 * @param {number} discount - Discount percentage
 * @returns {number} - Savings amount
 */
export function calculateSavings(price, discount) {
    if (!price || !discount || discount <= 0) {
        return 0;
    }
    return (price * discount) / 100;
}

/**
 * Format rating display
 * @param {number} rating - Rating value
 * @param {number} maxRating - Maximum rating value (default: 5)
 * @returns {string} - Formatted rating string
 */
export function formatRating(rating, maxRating = 5) {
    return rating ? `${rating.toFixed(1)}/${maxRating}` : 'N/A';
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export function truncateText(text, maxLength = 100) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Check if product is on sale
 * @param {number} discount - Discount percentage
 * @returns {boolean} - Whether product is on sale
 */
export function isOnSale(discount) {
    return discount && discount > 0;
}

/**
 * Get discount badge text
 * @param {number} discount - Discount percentage
 * @returns {string} - Badge text
 */
export function getDiscountBadgeText(discount) {
    if (!discount || discount <= 0) return '';
    return `${discount}% OFF`;
}
