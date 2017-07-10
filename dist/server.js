'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _graphqlServerExpress = require('graphql-server-express');

var _schema = require('./src/schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

// const generatePassword = require('password-generator');


server.use('*', (0, _cors2.default)({ origin: 'http://localhost:3000' }));

// Serve static files from the React app
server.use(_express2.default.static(_path2.default.join(__dirname, 'client/build')));

server.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({ schema: _schema2.default }));

server.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

// Put all API endpoints under '/api'
/* server.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
}); */

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
/* server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
}); */

var port = process.env.PORT || 5000;
server.listen(port, function () {
  return console.log('GraphQL Server is now running on http://localhost:' + port);
});