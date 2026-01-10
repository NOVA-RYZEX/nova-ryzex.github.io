/**
 * Navigation Component
 * Handles mobile menu toggle, scroll effects, and smooth navigation
 */

import { DOMUtils } from '../utils/dom.js';

export class Navigation {
	constructor() {
		this.navbar = DOMUtils.select('#navbar');
		this.menuToggle = DOMUtils.select('#menuToggle');
		this.mobileMenu = DOMUtils.select('#mobileMenu');
		this.mobileLinks = DOMUtils.selectAll('#mobileMenu a');
		this.navLinks = DOMUtils.selectAll('a[href^="#"]');

		this.scrollThreshold = 50;

		this.init();
	}

	/**
	 * Initialize navigation component
	 */
	init() {
		this.setupMobileMenu();
		this.setupScrollEffect();
		this.setupSmoothScroll();
	}

	/**
	 * Setup mobile menu toggle functionality
	 */
	setupMobileMenu() {
		if (!this.menuToggle || !this.mobileMenu) return;

		// Toggle menu on button click
		DOMUtils.on(this.menuToggle, 'click', () => {
			this.toggleMobileMenu();
		});

		// Close menu when clicking on links
		this.mobileLinks.forEach(link => {
			DOMUtils.on(link, 'click', () => {
				this.closeMobileMenu();
			});
		});
	}

	/**
	 * Toggle mobile menu visibility
	 */
	toggleMobileMenu() {
		DOMUtils.toggleClass(this.mobileMenu, 'hidden');

		const icon = DOMUtils.select('#menuToggle i');
		if (icon) {
			DOMUtils.toggleClass(icon, 'fa-bars');
			DOMUtils.toggleClass(icon, 'fa-times');
		}
	}

	/**
	 * Close mobile menu
	 */
	closeMobileMenu() {
		DOMUtils.addClass(this.mobileMenu, 'hidden');

		const icon = DOMUtils.select('#menuToggle i');
		if (icon) {
			DOMUtils.addClass(icon, 'fa-bars');
			DOMUtils.removeClass(icon, 'fa-times');
		}
	}

	/**
	 * Setup navbar scroll effect
	 */
	setupScrollEffect() {
		if (!this.navbar) return;

		DOMUtils.on(window, 'scroll', () => {
			const scrollY = DOMUtils.getScrollY();

			if (scrollY > this.scrollThreshold) {
				DOMUtils.addClass(this.navbar, 'shadow-lg', 'shadow-slate-900/50');
			} else {
				DOMUtils.removeClass(this.navbar, 'shadow-lg', 'shadow-slate-900/50');
			}
		});
	}

	/**
	 * Setup smooth scrolling for anchor links
	 */
	setupSmoothScroll() {
		this.navLinks.forEach(anchor => {
			DOMUtils.on(anchor, 'click', (e) => {
				const href = anchor.getAttribute('href');

				// Only handle internal anchors
				if (href !== '#' && href !== '') {
					e.preventDefault();
					const target = DOMUtils.select(href);

					if (target) {
						DOMUtils.scrollToElement(target, 100);
					}
				}
			});
		});
	}
}
