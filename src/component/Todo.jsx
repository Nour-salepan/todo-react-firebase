import { List, ListItem, ListItemText, IconButton, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export const Todo = ({ todo, handleDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          {/* <input type="text" placeholder="edit something" /> */}
          <h1>l am modal of the centu</h1>
          <button onClick={() => setOpen(false)}>close</button>
        </div>
      </Modal>

      <List>
        <ListItem>
          <ListItemText primary={todo.text} secondary="our tasks todo" />

          <IconButton
            sx={{ ml: 6 }}
            onClick={() => handleDelete(todo.id)}
            variant="outlined"
          >
            <DeleteIcon />
          </IconButton>
          <button onClick={() => setOpen(true)}>edit</button>
        </ListItem>
      </List>
    </>
  );
};
