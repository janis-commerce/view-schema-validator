'use strict';

class SchemaModifier {
	/**
	 * Default action for empty schema actions
	 * @name addBrowseActions
	 * @param {object} schema
	 * @return {object}
	 */
	static addBrowseActions(data) {
		const dataCopy = { ...data };
		const { service, namespace } = dataCopy.source;

		dataCopy.actions = [{
			name: 'new',
			icon: 'star_light',
			color: 'fizzGreen',
			type: 'link',
			options: {
				path: `/${service}/${namespace}/new`
			}
		}];

		return dataCopy;
	}

	/**
	 * Check if is ad browse schema
	 * @param {object} data
	 * @return {boolean}
	 */
	static isBrowse(data) {
		return data.root === 'Browse';
	}

	static execute(data) {
		if(this.isBrowse(data) && (!data.actions || !data.actions.length))
			return this.addBrowseActions(data);

		return data;
	}
}

module.exports = SchemaModifier;
