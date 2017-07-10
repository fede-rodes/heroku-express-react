'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _channels = [{
  id: 1,
  name: 'soccer'
}, {
  id: 2,
  name: 'baseball'
}];

var resolvers = {
  Query: {
    channels: function channels() {
      return _channels;
    }
  },
  Mutation: {
    addChannel: function addChannel(root, args) {
      var newChannel = { id: _channels.length + 1, name: args.name };
      _channels.push(newChannel);
      return newChannel;
    }
  }
};

exports.default = resolvers;