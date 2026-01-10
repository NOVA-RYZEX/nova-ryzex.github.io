/**
 * Back to Top Button Component
 * Handles visibility and scroll functionality
 */

import { DOMUtils } from '../utils/dom.js';

export class BackToTop {
	constructor() {
		this.button = DOMUtils.select('#backToTop');
		this.visibilityThreshold = 500;

		this.init();
	}

	/**
	 * Initialize back to top button
	 */
	init() {
		if (!this.button) return;

		this.setupScrollListener();
		this.setupClickHandler();
	}

	/**
	 * Setup scroll listener for button visibility
	 */
	setupScrollListener() {
		DOMUtils.on(window, 'scroll', () => {
			const scrollY = DOMUtils.getScrollY();

			if (scrollY > this.visibilityThreshold) {
				this.show();
			} else {
				this.hide();
			}
		});
	}

	/**
	 * Setup click handler to scroll to top
	 */
	setupClickHandler() {
		DOMUtils.on(this.button, 'click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}

	/**
	 * Show button
	 */
	show() {
		DOMUtils.removeClass(this.button, 'opacity-0', 'invisible');
	}

	/**
	 * Hide button
	 */
	hide() {
		DOMUtils.addClass(this.button, 'opacity-0', 'invisible');
	}
}
