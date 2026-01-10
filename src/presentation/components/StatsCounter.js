/**
 * Stats Counter Component
 * Animated counter for statistics display
 */

export class StatsCounter {
	/**
	 * Animate counter from 0 to target value
	 */
	static animateCounter(element, target, duration = 2000) {
		if (!element) return;

		const steps = 60;
		const increment = target / steps;
		const stepDuration = duration / steps;
		let current = 0;

		const timer = setInterval(() => {
			current += increment;
			if (current >= target) {
				element.textContent = target;
				clearInterval(timer);
			} else {
				element.textContent = Math.floor(current);
			}
		}, stepDuration);
	}

	/**
	 * Update all stats counters
	 */
	static updateStats(stats) {
		const elements = document.querySelectorAll('.stat-counter');
		const labels = ['Members', 'Projects', 'Skills'];

		labels.forEach((label, index) => {
			if (elements[index]) {
				const key = label.toLowerCase();
				this.animateCounter(elements[index], stats[key] || 0);
			}
		});
	}
}
