/**
	Define and instantiate your enyo.Application kind in this file.  Note,
	application rendering should be deferred until DOM is ready by wrapping
	it in a call to enyo.ready().
*/

enyo.kind({
	name: 'restaurant.Application',
	kind: 'enyo.Application',
	view: 'restaurant.MainView',
	components: [
		{
			name: 'router',
			kind: 'enyo.Router',
			triggerOnStart: false,
			routes: [
				{ path: '', default: true, handler: 'showRoot' },
				{ path: 'new', handler: 'showNew' },
				{ path: 'edit/:id', handler: 'showEdit' }
			],
			publish: true
		}
	],
	create: function () {
		enyo.LocalStorageSource.create({name: 'localData'});
		var coll = new restaurant.RestaurantCollection();
		this.inherited(arguments);
		this.set('collection', coll);
		this.router.trigger();
	},
	showRoot: function () {
		this.view.hideAllPopups();
	},
	showNew: function () {
		this.view.showNewPopup();
	},
	showEdit: function (id) {
		this.view.showEditPopup(id);
	}
});

enyo.ready(function () {
	new restaurant.Application({name: 'app'});
});
