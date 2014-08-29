Template.home.helpers({
  schools: function() {
	return Schools.find().fetch();  
  }
});