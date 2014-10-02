enyo.kind({
	name: "restaurant.MainView",
	kind: "FittableRows",
	fit: true,
	components:[
		{ kind: 'onyx.Toolbar', components: [
			{ kind: 'onyx.Button', content: 'New restaurant...', ontap: 'newRequested' }
		]},
		{ name: 'list', kind: 'restaurant.RestaurantRepeater', onEdit: 'editRequested' },
		{ name: 'newPopup', kind: 'restaurant.NewRestaurantPopup', onHide: 'popupClosed' },
		{ name: 'editPopup', kind: 'restaurant.EditRestaurantPopup', onHide: 'popupClosed' }
	],
	bindings: [
		{ from: 'app.collection', to: '$.list.collection' }
	],
	rendered: function() {
		this.inherited(arguments);
		if(this.renderDialog) {
			this.$[renderDialog].show();
		}
	},
	newRequested: function() {
		this.app.router.trigger({ location: 'new', change: true });
	},
	editRequested: function(sender, event) {
		this.app.router.trigger({ location: 'edit/' + event.model.get('id'), change: true });
	},
	hideAllPopups: function() {
		if(this.rendered) {
			this.$.newPopup.hide();
		}
	},
	showNewPopup: function() {
		if(this.rendered) {
			this.$.newPopup.show();
		} else {
			this.renderDialog = 'newPopup';
		}
	},
	showEditPopup: function(id) {
		var model = this.app.collection.find(function(model) { return model.get('id') == id; });
		if(model) {
			this.set('$.editPopup.model', model);
			this.$.editPopup.show();
		} else {
			alert('Model not found');
		}
	},
	popupClosed: function() {
		this.app.router.trigger({ location: '', change: true });
	}
});
