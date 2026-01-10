/**
 * Animation Controller
 * Manages AOS (Animate On Scroll) initialization and configuration
 */

export class AnimationController {
	constructor(options = {}) {
		this.config = {
			duration: options.duration || 800,
			easing: options.easing || 'ease-out-cubic',
			once: options.once !== undefined ? options.once : true,
			offset: options.offset || 50,
			...options
		};

		this.init();
	}

	/**
	 * Initialize AOS library
	 */
	init() {
		if (typeof AOS === 'undefined') {
			console.warn('AOS library not loaded');
			return;
		}

		AOS.init(this.config);
	}

	/**
	 * Refresh AOS (useful after dynamic content changes)
	 */
	refresh() {
		if (typeof AOS !== 'undefined') {
			AOS.refresh();
		}
	}

	/**
	 * Refresh AOS for specific element
	 * @param {Element} element - Target element
	 */
	refreshElement(element) {
		if (typeof AOS !== 'undefined' && element) {
			AOS.refreshHard();
		}
	}
}
