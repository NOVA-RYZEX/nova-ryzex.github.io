/**
 * Portfolio Modal Component
 * Displays portfolios in a modal popup with iframe
 */

export class PortfolioModal {
	constructor() {
		this.modal = null;
		this.iframe = null;
		this.loader = null;
		this.modalTitle = null;
		this.closeBtn = null;
		this.openInNewTabBtn = null;
		this.init();
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

		// Detect environment
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
						<div class="flex items-center gap-2">
							<button id="openInNewTab" class="p-2 text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-slate-700/50" title="Open in new tab">
								<i class="fas fa-external-link-alt"></i>
							</button>
							<button id="closeModal" class="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-slate-700/50" title="Close (ESC)">
								<i class="fas fa-times text-xl"></i>
							</button>
						</div>
					</div>

					<!-- Modal Body (Iframe) -->
					<div class="relative w-full h-[calc(100%-64px)] bg-white">
						<!-- Loading Indicator -->
						<div id="iframeLoader" class="absolute inset-0 flex items-center justify-center bg-dark-bg z-10">
							<div class="text-center">
								<div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
								<p class="text-slate-400">Loading portfolio...</p>
							</div>
						</div>
						<!-- Iframe -->
						<iframe
							id="portfolioIframe"
							class="w-full h-full opacity-0 transition-opacity duration-300"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen>
						</iframe>
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

		// Open in new tab button
		this.openInNewTabBtn.addEventListener('click', () => {
			const src = this.iframe.src;
			if (src && src !== 'about:blank') {
				window.open(src, '_blank', 'noopener,noreferrer');
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
			this._showError();
		});
	}

	/**
	 * Handle iframe load event
	 */
	_handleIframeLoad() {
		// Hide loader and show iframe after short delay
		setTimeout(() => {
			this.loader.style.display = 'none';
			this.iframe.style.opacity = '1';
		}, 300);
	}

	/**
	 * Show error message
	 */
	_showError() {
		this.loader.innerHTML = `
			<div class="text-center">
				<i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
				<p class="text-slate-400 text-lg mb-2">Failed to load portfolio</p>
				<button onclick="location.reload()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
					Reload Page
				</button>
			</div>
		`;
	}

	/**
	 * Open modal with portfolio
	 */
	open(portfolioUrl, memberName = 'Portfolio') {
		if (!portfolioUrl || portfolioUrl === '#') {
			console.warn('No portfolio URL provided');
			return;
		}

		// Normalize URL for current environment
		const normalizedUrl = this._normalizePortfolioUrl(portfolioUrl);

		// Set title
		this.modalTitle.textContent = `${memberName}'s Portfolio`;

		// Show modal
		this.modal.classList.remove('hidden');
		this.modal.classList.add('flex');
		document.body.classList.add('modal-open');

		// Reset iframe
		this.iframe.style.opacity = '0';
		this.loader.style.display = 'flex';
		this.loader.innerHTML = `
			<div class="text-center">
				<div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
				<p class="text-slate-400">Loading portfolio...</p>
			</div>
		`;

		// Load portfolio in iframe
		setTimeout(() => {
			this.iframe.src = normalizedUrl;
			console.log(`Loading portfolio: ${normalizedUrl}`);
		}, 100);
	}

	/**
	 * Close modal
	 */
	close() {
		this.modal.classList.add('hidden');
		this.modal.classList.remove('flex');
		document.body.classList.remove('modal-open');

		// Clear iframe after animation
		setTimeout(() => {
			this.iframe.src = 'about:blank';
			this.loader.style.display = 'flex';
			this.iframe.style.opacity = '0';
		}, 300);
	}
}
