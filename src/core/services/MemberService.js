/**
 * Member Service
 * Business logic for managing members
 */

import { Member } from '../models/Member.js';

export class MemberService {
	constructor(repository) {
		this.repository = repository;
		this.members = [];
		this.allSkills = new Set();
	}

	/**
	 * Load all members from repository
	 */
	async loadMembers() {
		try {
			const data = await this.repository.fetchMembers();
			this.members = data.map(item => new Member(item));
			this._extractSkills();
			return this.members;
		} catch (error) {
			console.error('Error loading members:', error);
			return [];
		}
	}

	/**
	 * Search members by query
	 */
	searchMembers(query) {
		if (!query) return this.members;
		return this.members.filter(member => member.matchesSearch(query));
	}

	/**
	 * Filter members by skill
	 */
	filterBySkill(skill) {
		if (!skill) return this.members;
		return this.members.filter(member => member.hasSkill(skill));
	}

	/**
	 * Get statistics
	 */
	getStats() {
		return {
			members: this.members.length,
			projects: this.members.length * 3, // Estimate
			skills: this.allSkills.size
		};
	}

	/**
	 * Get all unique skills
	 */
	getAllSkills() {
		return Array.from(this.allSkills);
	}

	/**
	 * Extract unique skills from all members
	 */
	_extractSkills() {
		this.allSkills.clear();
		this.members.forEach(member => {
			member.getSkills().forEach(skill => this.allSkills.add(skill));
		});
	}
}
