// import { GraphQLServer } from 'graphql-yoga'
// // ... or using `require()`
const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test5", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
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
      removeTodo(id: ID!): Boolean
      updateTodo(id: ID!, complete: Boolean!): Boolean
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    todos: () => Todo.find(),
  },
  // All functions to exist in the todo have to exist inside a Mutation
  Mutation: {
    //   Creating a new todo
    createTodo: async (_, { text }) => {
      const todo = new Todo({ text, complete: false });
      await todo.save();
      return todo;
    },
    //   Updating a already existing todo by grabbing the ID and the complete property
    updateTodo: async (_, { id, complete }) => {
      await Todo.findByIdAndUpdate(id, { complete });
      return true;
    },
    // Removing a todo by attaching a ID
    // What's the difference between Removing and Deleting
    removeTodo: async (_, { id }) => {
      await Todo.findByIdAndRemove(id);
      return true;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
