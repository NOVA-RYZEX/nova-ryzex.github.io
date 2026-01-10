/**
 * NOVA Portfolio Hub - Main Application Entry Point
 * Clean Architecture Implementation with Tailwind CSS and AOS
 */

// Core Layer
import { MemberService } from './core/services/MemberService.js';

// Infrastructure Layer
import { MemberRepository } from './infrastructure/api/MemberRepository.js';

// Presentation Layer
import { Navigation } from './presentation/components/Navigation.js';
import { PortfolioGrid } from './presentation/components/PortfolioGrid.js';
import { PortfolioModal } from './presentation/components/PortfolioModal.js';
import { SkillFilter } from './presentation/components/SkillFilter.js';
import { StatsCounter } from './presentation/components/StatsCounter.js';

// Shared Layer
import { AppConfig } from './shared/config/app.config.js';
import { DOM_ELEMENTS } from './shared/constants/index.js';
import { DOMUtils } from './shared/utils/dom.utils.js';

/**
 * Main Application Class
 * Orchestrates all components and services
 */
class App {
	constructor() {
		// Initialize infrastructure
		this.repository = new MemberRepository(AppConfig.data.membersUrl);

		// Initialize core services
		this.memberService = new MemberService(this.repository);

		// Initialize presentation components
		this.portfolioGrid = new PortfolioGrid(DOM_ELEMENTS.PORTFOLIO_GRID);
		this.portfolioModal = new PortfolioModal();
		this.skillFilter = new SkillFilter(DOM_ELEMENTS.SKILL_FILTERS);
		this.navigation = new Navigation();

		// Get DOM elements
		this.searchInput = DOMUtils.getElement(DOM_ELEMENTS.SEARCH_INPUT);
	}

	/**
	 * Initialize the application
	 */
	async init() {
		console.log('🚀 Initializing NOVA Portfolio Hub...');

		try {
			// Show loading state
			this.portfolioGrid.showLoading();

			// Load members
			const members = await this.memberService.loadMembers();
			console.log(`✓ Loaded ${members.length} portfolio(s)`);

			// Render UI
			this.portfolioGrid.render(members);
			this.skillFilter.render(this.memberService.getAllSkills());

			if (AppConfig.features.enableStats) {
				StatsCounter.updateStats(this.memberService.getStats());
			}

			// Refresh AOS after rendering content
			this._refreshAOS();

			// Setup event listeners
			this._setupEventListeners();

			console.log('✓ Application initialized successfully!');
		} catch (error) {
			console.error('Failed to initialize application:', error);
			this.portfolioGrid.showEmpty('Failed to load portfolios. Please refresh the page.');
		}
	}

	/**
	 * Setup all event listeners
	 */
	_setupEventListeners() {
		// Portfolio modal functionality
		this._setupPortfolioModal();

		// Search functionality
		if (this.searchInput && AppConfig.features.enableSearch) {
			const debouncedSearch = DOMUtils.debounce((e) => {
				const query = e.target.value.trim();
				const results = this.memberService.searchMembers(query);
				this.portfolioGrid.render(results);
				this._refreshAOS(); // Refresh animations after search
			}, AppConfig.ui.searchDebounceDelay);

			this.searchInput.addEventListener('input', debouncedSearch);
		}

		// Skill filter functionality
		if (AppConfig.features.enableFilters) {
			this.skillFilter.onFilterChange = (skill) => {
				const results = skill
					? this.memberService.filterBySkill(skill)
					: this.memberService.members;

				this.portfolioGrid.render(results);
				this._refreshAOS(); // Refresh animations after filter

				// Clear search when filtering
				if (this.searchInput) {
					this.searchInput.value = '';
				}
			};
		}
	}

	/**
	 * Setup portfolio modal event listeners
	 */
	_setupPortfolioModal() {
		// Use event delegation for dynamically loaded portfolio cards
		document.addEventListener('click', (e) => {
			const button = e.target.closest('.portfolio-view-btn');
			if (button) {
				e.preventDefault();
				const portfolioUrl = button.getAttribute('data-portfolio-url');
				const memberName = button.getAttribute('data-member-name');

				if (portfolioUrl && portfolioUrl !== '#') {
					this.portfolioModal.open(portfolioUrl, memberName);
				}
			}
		});
	}

	/**
	 * Refresh AOS animations for dynamically loaded content
	 */
	_refreshAOS() {
		if (typeof AOS !== 'undefined') {
			// Small delay to ensure DOM is updated
			setTimeout(() => {
				AOS.refresh();
			}, 100);
		}
	}
}

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
	const app = new App();
	app.init();
});
