'use strict';

class SchemaModifier {
	/**
	 * Default action for empty schema actions
	 * @name addBrowseActions
	 * @param {object} schema
	 * @return {object}
	 */
	static addBrowseActions(data) {
		if(!data.actions.length) {
			const { service, namespace } = data.source;

			data.actions = [{
				name: 'new',
				icon: 'star_light',
				color: 'fizzGreen',
				type: 'link',
				options: {
					path: `/view/${service}/${namespace}/new`
				}
			}];
		}

		return data;
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
		let modifierData = { ...data };

		if(this.isBrowse(modifierData))
			modifierData = this.addBrowseActions(modifierData);

		return modifierData;
	}
}

module.exports = SchemaModifier;
