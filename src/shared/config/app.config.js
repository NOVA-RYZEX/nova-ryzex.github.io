/**
 * Application Configuration
 * Centralized configuration settings
 */

export const AppConfig = {
	// Data sources
	data: {
		membersUrl: 'public/data/members.json',
		cacheEnabled: true,
		cacheDuration: 5 * 60 * 1000 // 5 minutes
	},

	// UI settings
	ui: {
		searchDebounceDelay: 300, // milliseconds
		animationDuration: 2000, // milliseconds
		cardsPerRow: {
			mobile: 1,
			tablet: 2,
			desktop: 3
		}
	},

	// Feature flags
	features: {
		enableSearch: true,
		enableFilters: true,
		enableStats: true,
		enableAnimations: true
	},

	// Performance
	performance: {
		lazyLoadImages: true,
		enableServiceWorker: false
	},

	// Social media platforms
	socialPlatforms: {
		github: {
			icon: 'fab fa-github',
			label: 'GitHub'
		},
		linkedin: {
			icon: 'fab fa-linkedin',
			label: 'LinkedIn'
		},
		twitter: {
			icon: 'fab fa-twitter',
			label: 'Twitter'
		}
	}
};
