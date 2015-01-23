Package.describe({
  name: '3stack:presence-colours',
  version: '1.0.0',
  summary: 'Assign each user online a distinct colour (locally)',
  git: 'https://github.com/3stack-software/meteor-presence-colours',
  documentation: 'README.md'
});


Package.onUse(function(api){

  api.versionsFrom('METEOR@0.9.2');

  api.export([
    'PresenceColours',
    'presencesWithColour'
  ], 'client');

  api.use([
    'underscore',
    'mongo',
    '3stack:presence@1.0.0'
  ], 'client');

  api.addFiles('presence-colours.js', 'client');
});
