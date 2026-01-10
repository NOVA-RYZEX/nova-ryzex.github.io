/**
 * DOM Utility Functions
 * Helper functions for DOM manipulation and queries
 */

export class DOMUtils {
	/**
	 * Query selector wrapper
	 * @param {string} selector - CSS selector
	 * @returns {Element|null}
	 */
	static select(selector) {
		return document.querySelector(selector);
	}

	/**
	 * Query selector all wrapper
	 * @param {string} selector - CSS selector
	 * @returns {NodeList}
	 */
	static selectAll(selector) {
		return document.querySelectorAll(selector);
	}

	/**
	 * Add event listener with error handling
	 * @param {Element|Window} element - Target element
	 * @param {string} event - Event name
	 * @param {Function} handler - Event handler
	 */
	static on(element, event, handler) {
		if (!element) {
			console.warn(`Element not found for event: ${event}`);
			return;
		}
		element.addEventListener(event, handler);
	}

	/**
	 * Toggle class on element
	 * @param {Element} element - Target element
	 * @param {string} className - Class name to toggle
	 */
	static toggleClass(element, className) {
		if (!element) return;
		element.classList.toggle(className);
	}

	/**
	 * Add class to element
	 * @param {Element} element - Target element
	 * @param {...string} classNames - Class names to add
	 */
	static addClass(element, ...classNames) {
		if (!element) return;
		element.classList.add(...classNames);
	}

	/**
	 * Remove class from element
	 * @param {Element} element - Target element
	 * @param {...string} classNames - Class names to remove
	 */
	static removeClass(element, ...classNames) {
		if (!element) return;
		element.classList.remove(...classNames);
	}

	/**
	 * Check if element has class
	 * @param {Element} element - Target element
	 * @param {string} className - Class name to check
	 * @returns {boolean}
	 */
	static hasClass(element, className) {
		if (!element) return false;
		return element.classList.contains(className);
	}

	/**
	 * Smooth scroll to element
	 * @param {Element} element - Target element
	 * @param {number} offset - Offset from top (default: 100)
	 */
	static scrollToElement(element, offset = 100) {
		if (!element) return;
		const targetPosition = element.offsetTop - offset;
		window.scrollTo({
			top: targetPosition,
			behavior: 'smooth'
		});
	}

	/**
	 * Get current scroll position
	 * @returns {number}
	 */
	static getScrollY() {
		return window.pageYOffset || document.documentElement.scrollTop;
	}
}
