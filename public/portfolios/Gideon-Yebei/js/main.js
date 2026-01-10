/**
 * Main Application Entry Point
 * Initializes all components and handles application lifecycle
 */

import { AnimationController } from './components/AnimationController.js';
import { BackToTop } from './components/BackToTop.js';
import { Navigation } from './components/Navigation.js';

class App {
	constructor() {
		this.components = {};
	}

	/**
	 * Initialize the application
	 */
	init() {
		// Wait for DOM to be ready
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', () => this.setup());
		} else {
			this.setup();
		}
	}

	/**
	 * Setup all components
	 */
	setup() {
		try {
			// Initialize animation controller
			this.components.animation = new AnimationController({
				duration: 800,
				easing: 'ease-out-cubic',
				once: true,
				offset: 50
			});

			// Initialize navigation
			this.components.navigation = new Navigation();

			// Initialize back to top button
			this.components.backToTop = new BackToTop();

			console.log('✨ Portfolio initialized successfully');
		} catch (error) {
			console.error('Error initializing portfolio:', error);
		}
	}

	/**
	 * Get component instance
	 * @param {string} name - Component name
	 * @returns {Object|null}
	 */
	getComponent(name) {
		return this.components[name] || null;
	}
}

// Initialize application
const app = new App();
app.init();

// Export for potential external use
export default app;
