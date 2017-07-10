import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { makeExecutableSchema } from 'graphql-tools';

import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';

const port = process.env.PORT || 5000;
const networkInterface = createNetworkInterface({
  uri: `http://localhost:${port}/graphql`,
});
console.log('React app listening at port', port);

const client = new ApolloClient({
  networkInterface,
});

const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <ul>
      {channels.map(ch => <li key={ch.id}>{ch.name}</li>)}
    </ul>
  );
};

const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);
//------------------------------------------------------------------------------
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
