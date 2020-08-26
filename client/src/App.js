import React, { Component } from "react";
import { gql, useMutation } from "@apollo/client";
import { graphql, compose } from "@apollo/client/react/hoc";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const TodosQuery = gql`
  {
    todos {
      id
      text
      complete
    }
  }
`;

const UpdateMutation = gql`
  mutation UpdateTodo($id: String!, complete: Boolean!){
    updateTodo(id: $id, complete: $complete)
  }
`;

class App extends Component {
  updateTodo = async (todo) => {
    //update todo
    await this.props.updateTodo({
      variable: {
        id: todo.id,
        complete: !todo.complete,
      },
    });
  };

  removeTodo = (todo) => {
    //remove todo
  };

  render() {
    const {
      data: { loading, todos },
    } = this.props;

    if (loading) {
      return null;
    }

    return (
      <div style={{ display: "flex" }}>
        <div style={{ margin: "auto", width: 400 }}>
          <Paper elevation={1}>
            <List>
              {todos.map((todo) => {
                const labelId = `checkbox-list-label-${todo}`;

                return (
                  <ListItem
                    key={todo.id}
                    role={undefined}
                    dense
                    button
                    onClick={() => this.updateTodo(todo)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={todo.complete}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={todo.text} />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => this.removeTodo(todo)}
                        edge="end"
                        aria-label="comments"
                      >
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </div>
      </div>
    );
  }
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// <List className={classes.root}>

export default compose(
  graphql(UpdateMutation, { name: "updateTodo" }),
  graphql(TodosQuery)
)(App);
