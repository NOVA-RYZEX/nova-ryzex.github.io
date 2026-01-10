/**
 * Portfolio Modal Component
 * Displays portfolios in a popup/modal overlay with iframe
 */

export class PortfolioModal {
	constructor() {
		this.modal = null;
		this.iframe = null;
		this.baseUrl = null; // Store the base portfolio URL
		this.currentUrl = null; // Track current iframe URL
		this.navigationCheckInterval = null;
		this.init();
	}

	/**
	 * Initialize modal structure
	 */
	init() {
		// Create modal HTML
		const modalHTML = `
			<div id="portfolioModal" class="fixed inset-0 z-[9999] hidden items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
				<div class="relative w-full h-full max-w-7xl max-h-[90vh] bg-dark-card rounded-2xl shadow-2xl overflow-hidden border border-slate-700 animate-modal-in">
					<!-- Modal Header -->
					<div class="flex items-center justify-between p-4 border-b border-slate-700 bg-dark-bg/50">
						<div class="flex items-center gap-3">
							<div class="w-2 h-2 rounded-full bg-red-500"></div>
							<div class="w-2 h-2 rounded-full bg-yellow-500"></div>
							<div class="w-2 h-2 rounded-full bg-green-500"></div>
							<span id="modalTitle" class="ml-4 text-slate-300 font-medium"></span>
						</div>
						<div class="flex items-center gap-2">						<button id="portfolioHome" class="p-2 text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-slate-700/50" title="Back to portfolio home">
							<i class="fas fa-home"></i>
						</button>							<button id="openInNewTab" class="p-2 text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-slate-700/50" title="Open in new tab">
								<i class="fas fa-external-link-alt"></i>
							</button>
							<button id="closeModal" class="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-slate-700/50" title="Close">
								<i class="fas fa-times text-xl"></i>
							</button>
						</div>
					</div>

					<!-- Modal Body (Iframe) -->
					<div class="relative w-full h-[calc(100%-64px)] bg-white">
						<!-- Loading Indicator -->
						<div id="iframeLoader" class="absolute inset-0 flex items-center justify-center bg-dark-bg">
							<div class="text-center">
								<div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
								<p class="text-slate-400">Loading portfolio...</p>
							</div>
						</div>
						<!-- Iframe -->
						<iframe id="portfolioIframe" class="w-full h-full opacity-0 transition-opacity duration-300" frameborder="0" sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation-by-user-activation"></iframe>
					</div>
				</div>
			</div>
		`;

		// Add modal to body
		document.body.insertAdjacentHTML('beforeend', modalHTML);

		// Get elements
		this.modal = document.getElementById('portfolioModal');
		this.iframe = document.getElementById('portfolioIframe');
		this.loader = document.getElementById('iframeLoader');
		this.modalTitle = document.getElementById('modalTitle');
		this.closeBtn = document.getElementById('closeModal');
		this.portfolioHomeBtn = document.getElementById('portfolioHome');
		this.openInNewTabBtn = document.getElementById('openInNewTab');

		// Setup event listeners
		this._setupEventListeners();

		// Add styles for modal animation
		this._addStyles();
	}

	/**
	 * Add custom styles for modal
	 */
	_addStyles() {
		const style = document.createElement('style');
		style.textContent = `
			@keyframes modal-in {
				from {
					opacity: 0;
					transform: scale(0.95);
				}
				to {
					opacity: 1;
					transform: scale(1);
				}
			}

			.animate-modal-in {
				animation: modal-in 0.2s ease-out;
			}

			/* Prevent body scroll when modal is open */
			body.modal-open {
				overflow: hidden;
			}
		`;
		document.head.appendChild(style);
	}

	/**
	 * Setup event listeners
	 */
	_setupEventListeners() {
		// Close button
		this.closeBtn.addEventListener('click', () => this.close());

		// Portfolio home button
		this.portfolioHomeBtn.addEventListener('click', () => this._goToPortfolioHome());

		// Open in new tab button
		this.openInNewTabBtn.addEventListener('click', () => {
			const src = this.currentUrl || this.iframe.src;
			if (src && src !== 'about:blank') {
				window.open(src, '_blank');
			}
		});

		// Close on backdrop click
		this.modal.addEventListener('click', (e) => {
			if (e.target === this.modal) {
				this.close();
			}
		});

		// Close on ESC key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
				this.close();
			}
		});

		// Iframe load event
		this.iframe.addEventListener('load', () => {
			this._handleIframeLoad();
		});

		// Iframe error event
		this.iframe.addEventListener('error', () => {
			this.loader.innerHTML = `
				<div class="text-center">
					<i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
					<p class="text-slate-400">Failed to load portfolio</p>
				</div>
			`;
		});
	}

	/**
	 * Handle iframe load event
	 */
	_handleIframeLoad() {
		try {
			// Try to get current iframe URL
			const iframeUrl = this.iframe.contentWindow.location.href;

			// Check if navigation left the portfolio domain
			if (this.baseUrl && !this._isWithinPortfolio(iframeUrl)) {
				// If navigated outside portfolio, reload base URL
				console.warn('Navigation outside portfolio detected, returning to portfolio home');
				this._goToPortfolioHome();
				return;
			}

			// Update current URL
			this.currentUrl = iframeUrl;
		} catch (e) {
			// Cross-origin restriction - iframe navigated to different origin
			// This is expected for external links
			console.log('Iframe navigated to different origin (cross-origin)');
		}

		// Hide loader and show iframe
		this.loader.style.display = 'none';
		this.iframe.style.opacity = '1';
	}

	/**
	 * Check if URL is within the portfolio domain
	 */
	_isWithinPortfolio(url) {
		if (!url || url === 'about:blank') return false;
		if (!this.baseUrl) return true;

		try {
			const currentUrlObj = new URL(url);
			const baseUrlObj = new URL(this.baseUrl, window.location.origin);

			// Check if same origin
			if (currentUrlObj.origin !== baseUrlObj.origin) {
				return false;
			}

			// Check if path starts with portfolio base path
			const basePath = baseUrlObj.pathname.replace(/\/[^/]*$/, '');
			return currentUrlObj.pathname.startsWith(basePath);
		} catch (e) {
			return false;
		}
	}

	/**
	 * Normalize portfolio URL for different environments
	 * Handles both local dev (/public/portfolios/) and GitHub Pages (/portfolios/)
	 */
	_normalizePortfolioUrl(url) {
		if (!url) return url;

		// Remove /public/ prefix if present (for GitHub Pages compatibility)
		let normalizedUrl = url.replace(/^\/public\//, '/');

		// Ensure URL starts with /
		if (!normalizedUrl.startsWith('/')) {
			normalizedUrl = '/' + normalizedUrl;
		}

		// Detect environment more reliably
		const hostname = window.location.hostname;
		const isGitHubPages = hostname.includes('.github.io');
		const isLocalDev = hostname === 'localhost' ||
		                   hostname === '127.0.0.1' ||
		                   hostname === '' ||
		                   hostname.startsWith('192.168.') ||
		                   hostname.startsWith('10.0.');

		// For GitHub Pages, use clean URLs without /public/
		if (isGitHubPages) {
			console.log(`GitHub Pages detected, using URL: ${normalizedUrl}`);
			return normalizedUrl;
		}

		// For local dev, add /public/ back if needed
		if (isLocalDev && !normalizedUrl.startsWith('/public/')) {
			normalizedUrl = '/public' + normalizedUrl;
			console.log(`Local dev detected, using URL: ${normalizedUrl}`);
		}

		return normalizedUrl;
	}

	/**
	 * Navigate iframe back to portfolio home
	 */
	_goToPortfolioHome() {
		if (this.baseUrl && this.iframe.src !== this.baseUrl) {
			this.loader.style.display = 'flex';
			this.iframe.style.opacity = '0';
			this.iframe.src = this.baseUrl;
		}
	}

	/**
	 * Start monitoring iframe navigation
	 */
	_startNavigationMonitoring() {
		// Clear any existing interval
		this._stopNavigationMonitoring();

		// Check iframe navigation periodically
		this.navigationCheckInterval = setInterval(() => {
			try {
				const currentHref = this.iframe.contentWindow.location.href;

				// Detect if navigated to parent domain
				if (currentHref === window.location.href || currentHref === window.location.origin + '/') {
					console.warn('Detected navigation to parent page, returning to portfolio');
					this._goToPortfolioHome();
				}
			} catch (e) {
				// Cross-origin - can't access, which is fine
			}
		}, 500);
	}

	/**
	 * Stop monitoring iframe navigation
	 */
	_stopNavigationMonitoring() {
		if (this.navigationCheckInterval) {
			clearInterval(this.navigationCheckInterval);
			this.navigationCheckInterval = null;
		}
	}

	/**
	 * Open modal with portfolio
	 */
	open(portfolioUrl, memberName = 'Portfolio') {
		if (!portfolioUrl) return;

		// Normalize URL for current environment
		const normalizedUrl = this._normalizePortfolioUrl(portfolioUrl);

		// Store base URL for navigation checks
		this.baseUrl = normalizedUrl;
		this.currentUrl = normalizedUrl;

		// Set title
		this.modalTitle.textContent = `${memberName}'s Portfolio`;

		// Show modal
		this.modal.classList.remove('hidden');
		this.modal.classList.add('flex');
		document.body.classList.add('modal-open');

		// Reset iframe
		this.iframe.style.opacity = '0';
		this.loader.style.display = 'flex';

		// Load portfolio in iframe
		setTimeout(() => {
			this.iframe.src = normalizedUrl;
			this._startNavigationMonitoring();
		}, 100);
	}

	/**
	 * Close modal
	 */
	close() {
		// Stop navigation monitoring
		this._stopNavigationMonitoring();

		this.modal.classList.add('hidden');
		this.modal.classList.remove('flex');
		document.body.classList.remove('modal-open');

		// Clear iframe after animation
		setTimeout(() => {
			this.iframe.src = 'about:blank';
			this.loader.style.display = 'flex';
			this.iframe.style.opacity = '0';
			this.baseUrl = null;
			this.currentUrl = null;
		}, 300);
	}
}
