// import { GraphQLServer } from 'graphql-yoga'
// // ... or using `require()`
const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test5", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Todo = mongoose.model("Todo", {
  text: String,
  complete: Boolean,
});

const typeDefs = `
  type Query {
    hello(name: String): String!
    todos: [Todo]
  }

  type Todo {
      id: ID!
      text: String!
      complete: Boolean!
  }

  type Mutation {
      createTodo(text: String!): Todo
      updateTodo(id: ID!, complete: Boolean!): Boolean
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    todos: () => Todo.find(),
  },
  Mutation: {
    createTodo: async (_, { text }) => {
      const todo = new Todo({ text, complete: false });
      await todo.save();
      return todo;
    },
    updateTodo: async (_, { id, complete }) => {
      Todo.findByIdAndUpdate(id, { complete });
      return true;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
