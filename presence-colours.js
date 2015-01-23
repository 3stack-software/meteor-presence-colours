"use strict";

PresenceColourManager.BUILT_IN_COLOURS = '#34b27d #dbdb57 #e09952 #cb4d4d #93c #4d77cb'.split(' ');

function PresenceColourManager(colours) {
  this.colours = colours != null ? colours : PresenceColourManager.BUILT_IN_COLOURS;
}

PresenceColourManager.prototype.configure = function(colours) {
  this.colours = colours;
};

PresenceColourManager.prototype.random = function() {
  return _.sample(this.colours);
};

PresenceColours = new PresenceColourManager();

presencesWithColour = new Mongo.Collection(null);

Meteor.startup(function() {
  presences.find().observeChanges({
    added: function(id, presence) {
      var existingUser, _ref;
      presence._id = id;
      existingUser = presencesWithColour.findOne({
        userId: presence.userId,
        colour: {
          $exists: true
        }
      }, {
        fields: {
          colour: 1
        }
      });
      presence.colour = (_ref = existingUser != null ? existingUser.colour : void 0) != null ? _ref : PresenceColours.random();
      presencesWithColour.insert(presence);
    },
    changed: function(id, fields) {
      var $modifier, key, value;
      $modifier = {};
      for (key in fields) {
        value = fields[key];
        if (value === void 0) {
          if ($modifier.$unset == null) {
            $modifier.$unset = {};
          }
          $modifier.$unset[key] = true;
        } else {
          if ($modifier.$set == null) {
            $modifier.$set = {};
          }
          $modifier.$set[key] = value;
        }
      }
      presencesWithColour.update(id, $modifier);
    },
    removed: function(id) {
      presencesWithColour.remove(id);
    }
  });
});
