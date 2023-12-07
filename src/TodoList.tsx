import React, { useState } from "react";
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { todos } from "./static_data/todos";
import { login_credentials } from "./static_data/configuration";

type TodoItem = {
  name: string;
  description: string;
};

function TodoList() {
  const [currentTodos, setCurrentTodos] = useState<TodoItem[]>(todos);
  const [completedTodos, setCompletedTodos] = useState<TodoItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { username, password } = login_credentials;

  const handleAddTodo = () => {
    setDialogOpen(true);
  };

  const handleTodoSubmit = () => {
    const todo: TodoItem = { name: name, description: description };
    const newUpdatedTodos = [...currentTodos, todo];
    setCurrentTodos(newUpdatedTodos);
    setName("");
    setDescription("");
    setDialogOpen(false);
  };

  const handleCompleteTodo = (todo: TodoItem) => {
    const newCurrentTodos = currentTodos.filter((t) => {
      return t.name !== todo.name;
    });
    setCurrentTodos(newCurrentTodos);

    const newCompletedTodos = [...completedTodos, todo];
    setCompletedTodos(newCompletedTodos);
  };

  const handleOnDelete = (todo: TodoItem, todoList: string) => {
    if (todoList === "current") {
      const newCurrentTodos = currentTodos.filter((t) => {
        return t.name !== todo.name;
      });
      setCurrentTodos(newCurrentTodos);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container>
      <Typography textAlign={"center"} variant="h4" mb={4} mt={2}>
        Todo Application
      </Typography>

      <Box textAlign={"right"}>
        <Button variant="contained" size="large" onClick={handleAddTodo}>
          New Todo
        </Button>
      </Box>

      <Typography variant="h6" mb={2} mt={2}>
        Current Todos
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightBlue" }}>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTodos.map((todo) => (
              <TableRow
                key={todo.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {todo.name}
                </TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>
                  <Button
                    sx={{ marginRight: "5px" }}
                    variant="contained"
                    color="success"
                    onClick={() => handleCompleteTodo(todo)}
                  >
                    Complete
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOnDelete(todo, "current")}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" mb={2} mt={4}>
        Completed Todos
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightBlue" }}>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedTodos.map((todo) => (
              <TableRow
                key={todo.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {todo.name}
                </TableCell>
                <TableCell>{todo.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Box mt={2}>
        {username}
        <div></div>
        {password}
      </Box> */}

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>New Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={name}
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            value={description}
            id="description"
            label="Description"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleTodoSubmit}>Add Todo</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TodoList;
