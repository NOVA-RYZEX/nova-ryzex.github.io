/**
 * Skill Filter Component
 * Handles skill filter tags rendering and interaction with Tailwind CSS
 */

export class SkillFilter {
	constructor(containerId) {
		this.container = document.getElementById(containerId);
		this.onFilterChange = null;
	}

	/**
	 * Render filter tags with Tailwind styling
	 */
	render(skills) {
		if (!this.container) return;

		const sortedSkills = Array.from(skills).sort();

		this.container.innerHTML = `
			<button class="filter-tag px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-primary text-white border-2 border-primary"
					data-skill=""
					data-aos="fade-up"
					data-aos-delay="0">
				All
			</button>
			${sortedSkills.map((skill, index) => `
				<button class="filter-tag px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-dark-card text-slate-300 border-2 border-slate-700 hover:border-primary hover:text-primary"
						data-skill="${skill}"
						data-aos="fade-up"
						data-aos-delay="${(index + 1) * 50}">
					${skill}
				</button>
			`).join('')}
		`;

		this._attachEventListeners();
	}

	/**
	 * Attach click event listeners to filter tags
	 */
	_attachEventListeners() {
		if (!this.container) return;

		this.container.addEventListener('click', (e) => {
			const tag = e.target.closest('.filter-tag');
			if (!tag) return;

			// Update active state with Tailwind classes
			this.container.querySelectorAll('.filter-tag').forEach(t => {
				t.classList.remove('bg-primary', 'text-white', 'border-primary');
				t.classList.add('bg-dark-card', 'text-slate-300', 'border-slate-700');
			});

			tag.classList.remove('bg-dark-card', 'text-slate-300', 'border-slate-700');
			tag.classList.add('bg-primary', 'text-white', 'border-primary');

			// Trigger callback
			const skill = tag.dataset.skill;
			if (this.onFilterChange) {
				this.onFilterChange(skill);
			}
		});
	}

	/**
	 * Reset filter to "All"
	 */
	reset() {
		if (!this.container) return;

		const allButton = this.container.querySelector('[data-skill=""]');
		if (allButton) {
			allButton.click();
		}
	}
}
