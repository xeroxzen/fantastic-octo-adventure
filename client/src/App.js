import React, {Component} from 'react';
import {gql} from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
// import { Query, Mutation, Subscription } from '@apollo/client/react/components';

const TodosQuery = gql`
  {
    todos {
        id
        text
        complete
    }
  }
`;

class App extends Component {
    render() {
      const { data: { loading, todos}} = this.props;

      if (loading) {
        return null;
      }

        return (
            <div>
                {todos.map(todo => <div key={`${todo.id}=todo-item`}>{todo.text}</div>)}
            </div>
        );
    }
}

export default graphql(TodosQuery) (App);

