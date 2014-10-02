enyo.kind({
	name: 'restaurant.DetailEditor',
	classes: 'restaurant-detail',
	components: [
		{ classes: 'onyx-toolbar-inline', components: [
			{ content: 'Name:', classes: 'restaurant-detail-label' },
			{ kind: 'onyx.InputDecorator', components: [
				{ name: 'name', kind: 'onyx.Input', classes: 'popup-input' }
			]}
		]},
		{ classes: 'onyx-toolbar-inline', components: [
			{ content: 'Cuisine:', classes: 'restaurant-detail-label'  },
			{ name: 'cuisine', kind: 'restaurant.CuisinePicker' }
		]},
		{ classes: 'onyx-toolbar-inline', components: [
			{ content: 'Specialty:', classes: 'restaurant-detail-label' },
			{ kind: 'onyx.InputDecorator', components: [
				{ name: 'specialty', kind: 'onyx.Input' }
			]}
		]},
		{ classes: 'onyx-toolbar-inline', components: [
			{ content: 'Rating:', classes: 'restaurant-detail-label' },
			{ kind: 'onyx.PickerDecorator', components: [
				{ style: 'min-width: 60px;' },
				{ name: 'rating', kind: 'onyx.IntegerPicker', max: 5 }
			]}
		]}
	],
	bindings: [
		{ from: 'model.name', to: '$.name.value', oneWay: false },
		{ from: 'model.cuisine', to: '$.cuisine.selected', oneWay: false, transform: 'toFromCuisine' },
		{ from: 'model.specialty', to: '$.specialty.value', oneWay: false },
		{ from: 'model.rating', to: '$.rating.value', oneWay: false }
	],
	// This transform will convert between what the model wants and what the picker expects
	toFromCuisine: function(value, direction) {
		if(direction === 1) {
			return this.$.cuisine.componentFromValue(value);
		} else {
			return this.$.cuisine.valueFromComponent(value);
		}
	}

});

enyo.kind({
	name: 'restaurant.NewRestaurantPopup',
	kind: 'onyx.Popup',
	modal: true,
	autoDismiss: false,
	centered: true,
	handlers: {
		onShow: 'popupShown',
		onHide: 'popupHid'
	},
	components: [
		{ content: 'Restaurant details', classes: 'restaurant-detail-title' },
		{ name: 'detailEditor', kind: 'restaurant.DetailEditor' },
		{ kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes:"footer-toolbar", components: [
			{ kind: 'onyx.Button', content: 'Cancel', ontap: 'cancel' },
			{ fit:true},
			{ kind: 'onyx.Button', content: 'Save', ontap: 'save' }
		]}
	],
	bindings: [
		{ from: 'model', to: '$.detailEditor.model' }
	],
	cancel: function() {
		this.hide();
		return true;
	},
	save: function() {
		this.app.collection.add(this.model);
		this.set('model', null);
		this.hide();
		return true;
	},
	popupShown: function(sender, event) {
		// Pickers use a popup to show the option list. Don't want to create model when they show.
		if(event.originator === this) {
			this.log('showing');
			this.set('model', new restaurant.RestaurantModel());
			// Not returning true because parent may want to handle this event
		} else {
			return true;	// Don't need to bubble out picker events
		}
	},
	popupHid: function(sender, event) {
		// Pickers use a popup to show the option list. Don't want to remove model when they hide.
		if(event.originator === this) {
			if(this.model) {
				this.model.destroy();	// Clean up the model when canceling
				this.set('model', null);
			}
			// Not returning true because parent may want to handle this event
		} else {
			return true;	// Don't need to bubble out picker events
		}
	}
});

enyo.kind({
	name: 'restaurant.EditRestaurantPopup',
	kind: 'onyx.Popup',
	modal: true,
	autoDismiss: false,
	centered: true,
	handlers: {
		onShow: 'popupShown',
		onHide: 'popupHid'
	},
	components: [
		{ content: 'Restaurant details', classes: 'restaurant-detail-title' },
		{ name: 'detailEditor', kind: 'restaurant.DetailEditor' },
		{ kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes:"footer-toolbar", components: [
			{ kind: 'onyx.Button', content: 'Delete', ontap: 'delete', classes: 'onyx-negative' },
			{ fit:true},
			{ kind: 'onyx.Button', content: 'Done', ontap: 'done' }
		]}
	],
	bindings: [
		{ from: 'model', to: '$.detailEditor.model' }
	],
	done: function() {
		this.hide();
		return true;
	},
	delete: function() {
		// It might be nice to confirm with the user that they meant to click delete
		this.model.destroy();
		this.done();
	}
});
