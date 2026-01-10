/**
 * Member Entity Model
 * Represents a portfolio member with validation
 */

export class Member {
	constructor(data) {
		this.name = data.name || '';
		this.avatar = data.avatar || '';
		this.role = data.role || '';
		this.portfolio = data.portfolio || '';
		this.location = data.location || '';
		this.bio = data.bio || '';
		this.skills = data.skills || [];
		this.social_links = data.social_links || {};
	}

	/**
	 * Validate member data
	 */
	isValid() {
		return (
			this.name.trim() !== '' &&
			this.avatar.trim() !== '' &&
			this.role.trim() !== '' &&
			this.portfolio.trim() !== '' &&
			Array.isArray(this.skills) &&
			this.skills.length > 0
		);
	}

	/**
	 * Check if member matches search query
	 */
	matchesSearch(query) {
		if (!query) return true;

		const lowerQuery = query.toLowerCase();
		return (
			this.name.toLowerCase().includes(lowerQuery) ||
			this.role.toLowerCase().includes(lowerQuery) ||
			this.bio.toLowerCase().includes(lowerQuery) ||
			this.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
		);
	}

	/**
	 * Check if member has specific skill
	 */
	hasSkill(skill) {
		return this.skills.includes(skill);
	}

	/**
	 * Get all unique skills from this member
	 */
	getSkills() {
		return [...this.skills];
	}
}
