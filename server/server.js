const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable introspection for GraphQL Playground
  playground: true,    // Enable GraphQL Playground
  plugins: [
    {
      serverWillStart() {
        console.log('Apollo Server starting...');
      },
    },
  ],
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
