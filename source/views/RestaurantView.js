enyo.kind({
	name: 'restaurant.RestaurantView',
	classes: 'restaurant-view onyx-toolbar-inline',
	events: {
		onEdit: ''
	},
	handlers: {
		onleave: 'blurred',
		onenter: 'focused'
	},
	components: [
		{ components: [
			{ name: 'name', classes: 'restaurant-name'},
			{ name: 'cuisine', classes: 'restaurant-cuisine'}
		]},
		{ components: [
			{ classes: 'onyx-toolbar-inline', components: [
				{ content: 'Specialty:', style: 'margin-left: 0px;' },
				{ name: 'specialty', classes: 'restaurant-specialty' }
			]},
			{ name: 'rating', classes: 'restaurant-rating' }
		]},
		{ name: 'edit', kind: 'onyx.Button', content: 'Edit', ontap: 'doEdit', classes: 'fade-button' }
	],
	bindings: [
		{ from: 'model.name', to: '$.name.content' },
		{ from: 'model.cuisine', to: '$.cuisine.content' },
		{ from: 'model.specialty', to: '$.specialty.content' },
		{ from: 'model.starRating', to: '$.rating.content' }
	],
	blurred: function() {
		this.$.edit.removeClass('focused');
	},
	focused: function() {
		this.$.edit.addClass('focused');
	}
});
