const express = require('express');
const {ApolloServer} = require('apollo-server-express');


const authors = [
  {
    id:'1',
    info:{
      name: "Joe Kelly",
      age: 32,
      gender: 'M',
    }
  },
  {
    id:'1',
    info:{
      name: "Joe Kelly",
      age: 32,
      gender: 'M',
    }
  }
]

// The GraphQL schema in string form
const typeDefs = `
  type Author {
    id: ID!
    info: Person
  }  
  type Person{
    name: String!
    age: Int
    gender: String
  }
  type Query {
    getAuthors: [Author]
    retrieveAuthor(id: ID!): Author
  }
`;

// The resolvers
const resolvers = {
  Query: {
    getAuthors: () => authors,
    retrieveAuthor:(obj, {id})=> authors.find(author=>author.id === id)
  }
};

const PORT = 3600;

// Put together a schema
const server = new ApolloServer({typeDefs, resolvers})

const app = express();

server.applyMiddleware({
  app,
  path: '/graphql'
});

app.listen(PORT,()=>{
  console.log(`Server ready`)
})
