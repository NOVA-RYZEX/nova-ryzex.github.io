/**
 * DOM Utility Functions
 * Helper functions for DOM manipulation
 */

export const DOMUtils = {
	/**
	 * Get element by ID
	 */
	getElement(id) {
		return document.getElementById(id);
	},

	/**
	 * Get all elements matching selector
	 */
	getElements(selector) {
		return document.querySelectorAll(selector);
	},

	/**
	 * Add event listener with delegation
	 */
	delegate(parent, eventType, selector, handler) {
		parent.addEventListener(eventType, (e) => {
			const target = e.target.closest(selector);
			if (target) {
				handler.call(target, e);
			}
		});
	},

	/**
	 * Debounce function execution
	 */
	debounce(func, delay) {
		let timeoutId;
		return function (...args) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func.apply(this, args), delay);
		};
	},

	/**
	 * Throttle function execution
	 */
	throttle(func, limit) {
		let inThrottle;
		return function (...args) {
			if (!inThrottle) {
				func.apply(this, args);
				inThrottle = true;
				setTimeout(() => (inThrottle = false), limit);
			}
		};
	},

	/**
	 * Check if element is in viewport
	 */
	isInViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	},

	/**
	 * Check if URL is same origin
	 */
	isSameOrigin(url1, url2) {
		try {
			const url1Obj = new URL(url1, window.location.origin);
			const url2Obj = new URL(url2, window.location.origin);
			return url1Obj.origin === url2Obj.origin;
		} catch (e) {
			return false;
		}
	},

	/**
	 * Check if URL is valid
	 */
	isValidUrl(urlString) {
		try {
			const url = new URL(urlString, window.location.origin);
			return url.protocol === 'http:' || url.protocol === 'https:';
		} catch (e) {
			return false;
		}
	},

	/**
	 * Get base path from URL
	 */
	getBasePath(url) {
		try {
			const urlObj = new URL(url, window.location.origin);
			const pathParts = urlObj.pathname.split('/').filter(Boolean);
			pathParts.pop(); // Remove last segment (file)
			return '/' + pathParts.join('/');
		} catch (e) {
			return '/';
		}
	},

	/**
	 * Check if URL is within a base path
	 */
	isWithinBasePath(url, basePath) {
		try {
			const urlObj = new URL(url, window.location.origin);
			const basePathNormalized = basePath.endsWith('/') ? basePath : basePath + '/';
			return urlObj.pathname.startsWith(basePathNormalized) || urlObj.pathname === basePath;
		} catch (e) {
			return false;
		}
	}
};
