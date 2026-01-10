/**
 * Portfolio Grid Component
 * Handles rendering of portfolio cards with Tailwind CSS
 */

export class PortfolioGrid {
	constructor(containerId) {
		this.container = document.getElementById(containerId);
	}

	/**
	 * Show loading state
	 */
	showLoading() {
		if (!this.container) return;

		this.container.innerHTML = `
			<div class="col-span-full flex flex-col items-center justify-center py-20">
				<div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
				<p class="text-slate-400 text-lg">Loading portfolios...</p>
			</div>
		`;
	}

	/**
	 * Show empty state
	 */
	showEmpty(message = 'No portfolios found') {
		if (!this.container) return;

		this.container.innerHTML = `
			<div class="col-span-full flex flex-col items-center justify-center py-20">
				<div class="text-6xl text-slate-600 mb-4">
					<i class="fas fa-search"></i>
				</div>
				<p class="text-slate-400 text-lg">${message}</p>
			</div>
		`;
	}

	/**
	 * Render portfolio cards
	 */
	render(members) {
		if (!this.container) return;

		if (members.length === 0) {
			this.showEmpty('No portfolios found. Try a different search.');
			return;
		}

		this.container.innerHTML = members
			.map((member, index) => this._createCard(member, index))
			.join('');
	}

	/**
	 * Create individual portfolio card HTML with Tailwind classes
	 */
	_createCard(member, index) {
		const socialLinks = member.social_links || {};
		const delay = (index % 3) * 100; // Stagger animation delays

		return `
			<div class="group bg-dark-card border border-slate-700 rounded-2xl p-6 hover:border-primary transition-all duration-300 hover-lift" data-aos="fade-up" data-aos-delay="${delay}">
				<!-- Card Header -->
				<div class="flex items-start gap-4 mb-6">
					<img src="${member.avatar || 'https://via.placeholder.com/64'}"
						 alt="${member.name}"
						 class="w-16 h-16 rounded-full border-2 border-primary object-cover flex-shrink-0"
						 loading="lazy">
					<div class="flex-1 min-w-0">
						<h3 class="text-xl font-bold font-heading text-white mb-1 truncate">${member.name || 'Anonymous'}</h3>
						<p class="text-sm text-slate-400">${member.role || 'Developer'}</p>
					</div>
				</div>

				<!-- Card Bio -->
				${member.bio ? `
					<p class="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">${member.bio}</p>
				` : ''}

				<!-- Skills -->
				${this._renderSkills(member.skills)}

				<!-- Card Footer -->
				<div class="flex items-center justify-between pt-4 mt-4 border-t border-slate-700">
				<button data-portfolio-url="${member.portfolio || '#'}" data-member-name="${member.name || 'Anonymous'}"
				   class="portfolio-view-btn group/link flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200 cursor-pointer">
					<span>View Portfolio</span>
					<i class="fas fa-arrow-right text-sm"></i>
				</button>
					<div class="flex items-center gap-2">
						${this._renderSocialLinks(socialLinks)}
					</div>
				</div>
			</div>
		`;
	}

	/**
	 * Render skills tags with Tailwind
	 */
	_renderSkills(skills) {
		if (!skills || skills.length === 0) return '';

		const visibleSkills = skills.slice(0, 5);
		const remainingCount = skills.length - 5;

		return `
			<div class="flex flex-wrap gap-2 mb-4">
				${visibleSkills.map(skill =>
					`<span class="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs font-medium">${skill}</span>`
				).join('')}
				${remainingCount > 0 ?
					`<span class="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-full text-slate-400 text-xs font-medium">+${remainingCount}</span>` : ''}
			</div>
		`;
	}

	/**
	 * Render social media links with Tailwind
	 */
	_renderSocialLinks(links) {
		const icons = {
			github: 'fab fa-github',
			linkedin: 'fab fa-linkedin',
			twitter: 'fab fa-twitter'
		};

		return Object.entries(links)
			.filter(([, url]) => url)
			.map(([platform, url]) => `
				<a href="${url}"
				   class="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-all duration-200 hover:-translate-y-1"
				   target="_blank"
				   aria-label="${platform}">
					<i class="${icons[platform] || 'fas fa-link'} text-sm"></i>
				</a>
			`)
			.join('');
	}
}
