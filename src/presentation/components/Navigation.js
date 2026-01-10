/**
 * Navigation Component
 * Handles navigation behavior and smooth scrolling
 */

export class Navigation {
	constructor() {
		this.navbar = document.querySelector('.navbar');
		this.menuToggle = document.querySelector('.menu-toggle');
		this.navLinks = document.querySelector('.nav-links');
		this.init();
	}

	/**
	 * Initialize navigation
	 */
	init() {
		this._setupScrollEffect();
		this._setupSmoothScroll();
		this._setupActiveLinks();
	}

	/**
	 * Setup scroll effect for navbar
	 */
	_setupScrollEffect() {
		if (!this.navbar) return;

		window.addEventListener('scroll', () => {
			if (window.scrollY > 50) {
				this.navbar.classList.add('scrolled');
			} else {
				this.navbar.classList.remove('scrolled');
			}
		});
	}

	/**
	 * Setup smooth scrolling for anchor links
	 */
	_setupSmoothScroll() {
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', (e) => {
				const href = anchor.getAttribute('href');
				if (href !== '#' && href !== '') {
					e.preventDefault();
					const target = document.querySelector(href);
					if (target) {
						target.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
						});
					}
				}
			});
		});
	}

	/**
	 * Setup active link highlighting based on scroll position
	 */
	_setupActiveLinks() {
		const sections = document.querySelectorAll('section[id]');

		window.addEventListener('scroll', () => {
			let current = '';

			sections.forEach(section => {
				const sectionTop = section.offsetTop;
				if (window.scrollY >= sectionTop - 200) {
					current = section.getAttribute('id');
				}
			});

			document.querySelectorAll('.nav-link').forEach(link => {
				link.classList.remove('active');
				if (link.getAttribute('href') === `#${current}`) {
					link.classList.add('active');
				}
			});
		});
	}
}
