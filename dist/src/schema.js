'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDefs = '\n  type Channel {\n    id: ID!                # "!" denotes a required field\n    name: String\n  }\n\n  type Query {\n    channels: [Channel]    # "[]" means this is a list of channels\n  }\n\n  # The mutation root type, used to define all mutations.\n  type Mutation {\n    # A mutation to add a new channel to the list of channels\n    addChannel(name: String!): Channel\n  }\n';

var schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: _resolvers2.default });
exports.default = schema;