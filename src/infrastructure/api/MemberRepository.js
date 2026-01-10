/**
 * Member Repository
 * Handles data fetching from external sources
 */

export class MemberRepository {
	constructor(dataUrl = './public/data/members.json') {
		this.dataUrl = dataUrl;
		this.cache = null;
		this.cacheTimestamp = null;
		this.cacheDuration = 5 * 60 * 1000; // 5 minutes
	}

	/**
	 * Fetch members from data source
	 */
	async fetchMembers() {
		// Return cached data if still valid
		if (this._isCacheValid()) {
			console.log('Using cached member data');
			return this.cache;
		}

		try {
			const response = await fetch(this.dataUrl);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// Validate data structure
			if (!Array.isArray(data)) {
				throw new Error('Invalid data format: expected array');
			}

			// Update cache
			this.cache = data;
			this.cacheTimestamp = Date.now();

			return data;
		} catch (error) {
			console.error('Failed to fetch members:', error);

			// Return cached data if available, even if expired
			if (this.cache) {
				console.warn('Using expired cache due to fetch error');
				return this.cache;
			}

			throw error;
		}
	}

	/**
	 * Clear cache
	 */
	clearCache() {
		this.cache = null;
		this.cacheTimestamp = null;
	}

	/**
	 * Check if cache is still valid
	 */
	_isCacheValid() {
		if (!this.cache || !this.cacheTimestamp) return false;
		return (Date.now() - this.cacheTimestamp) < this.cacheDuration;
	}
}
