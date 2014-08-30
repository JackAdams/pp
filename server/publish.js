Meteor.publish('organizations',function() {
  return Organizations.find({deleted: {$exists: false}, archive: {$exists:false}});
});

Meteor.publish('schools',function(organization_id) {
  return Schools.find({organization_id:organization_id,deleted: {$exists: false}});
});