Session.setDefault('organization_id',null);
Session.setDefault('school_id',null);

Template.home.helpers({
  organizations: function() {
	return Organizations.find({},{sort:{order:1,name:1}});  
  },
  schools: function() {
	return Schools.find({},{sort:{order:1,name:1}});  
  },
  selected: function(type) {
	return Session.equals(type + '_id',this._id);
  }
});

Template.home.events({
  'click li' : function(evt,tmpl) {
	var type = ($(evt.target).hasClass('organization')) ? 'organization' : 'school';
	Session.set(type + '_id',this._id);
  }
});