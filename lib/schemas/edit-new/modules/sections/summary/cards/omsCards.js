'use strict';

const {
	OMSOrderShippingCard,
	OMSOrderPickingCard,
	OMSOrderStepsCard,
	OMSOrderTotalsCard,
	OMSOrderCustomerCard,
	OMSOrderPaymentsCard
} = require('../cardNames');

const names = [
	OMSOrderShippingCard,
	OMSOrderPickingCard,
	OMSOrderStepsCard,
	OMSOrderTotalsCard,
	OMSOrderCustomerCard,
	OMSOrderPaymentsCard
];

module.exports = {
	if: {
		properties: {
			component: { enum: names }
		}
	},
	then: {
		properties: {
			component: { type: 'string', enum: names }
		},
		required: ['component'],
		additionalProperties: false
	}
};
