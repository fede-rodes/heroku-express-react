import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

// const generatePassword = require('password-generator');
import schema from './src/schema';

const server = express();

server.use('*', cors({ origin: 'http://localhost:3000' }));

// Serve static files from the React app
server.use(express.static(path.join(__dirname, 'client/build')));

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Put all API endpoints under '/api'
server.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
/* server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
}); */

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`GraphQL Server is now running on http://localhost:${port}`));
