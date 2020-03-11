const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./graphql/resolvers');
const authMiddleware = require('./middleware');
const isAuthenticated = require('./middleware/isAuthenticated')

const server = new GraphQLServer({ 
    typeDefs: "graphql/schema.graphql",
    resolvers,
    context: ({request}) => ({ request, isAuthenticated })
});

server.express.use(authMiddleware)
server.start(() => console.log('Server is running on localhost: 4000'))