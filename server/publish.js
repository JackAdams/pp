Meteor.publish('schools',function() {
  return Schools.find({deleted: {$exists: false}});
});