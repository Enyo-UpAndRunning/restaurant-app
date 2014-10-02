var cuisineArray = [
	'French',
	'Indian',
	'Italian',
	'Japanese',
	'Thai',
	'Unknown'
];

enyo.kind({
	name: 'restaurant.CuisinePicker',
	kind: 'onyx.PickerDecorator',
	components: [
		{ style: 'width: 200px;' },
		{ name: 'picker', kind: 'onyx.Picker' }
	],
	bindings: [
		{ from: 'selected', to: '$.picker.selected', oneWay: false }
	],
	create: function() {
		var i;
		this.inherited(arguments);
		for(i = 0;i < cuisineArray.length; i++) {
			this.$.picker.createComponent({ content: cuisineArray[i] }, { owner: this });
		}
	},
	// These are needed because the picker works from components, not strings/indexes
	//  and we want to be able to do bindings
	valueFromComponent: function(comp) {
		return comp.get('content');
	},
	componentFromValue: function(value) {
		var res = this.getComponents().filter(function(c) {
			return c.get('content') == value;
		});
		return res[0];
	}
});
