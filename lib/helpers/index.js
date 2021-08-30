'use strict';

module.exports = {

	/**
	 * Check if is a edit schema
	 * @param {object} schema
	 * @return {boolean}
	 */
	isEdit: schema => schema.root === 'Edit',

	/**
	 * Check if is a preview schema
	 * @param {object} schema
	 * @return {boolean}
	 */
	isPreview: schema => schema.root === 'Preview',

	/**
	 * Check if is a edit schema
	 * @param {object} schema
	 * @return {boolean}
	 */
	isBrowse: schema => schema.root === 'Browse',

	/**
	 * Get the diference between the current time an a date
	 * @param {string} The date
	 * @return {number} The diference in days
	 */
	getDaysToRemoveFeatureMessage: removeDay => {

		if(!removeDay)
			return '';

		const finalDay = new Date(removeDay);

		if(Number.isNaN(Date.parse(finalDay)))
			return '';

		const now = new Date();

		// To calculate the time difference of two dates
		const differenceInTime = finalDay.getTime() - now.getTime();

		// To calculate the no. of days between two dates
		let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

		if(differenceInDays < 0)
			differenceInDays = 0;

		return `You have ${differenceInDays} days to fix it.`;
	}
};
