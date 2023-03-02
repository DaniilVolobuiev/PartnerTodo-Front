import React from 'react';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import styles from '../styles/newTodo.module.scss';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useAppDispatch } from './../redux/hooks/index';
import {
  deleteTodoString,
  editTodoString,
  ItemInterface,
  openEditTodoString,
  setCheked,
} from '@/redux/slices/ItemSlice';
import axios from '../API/axios';
import Cookies from 'js-cookie';
import TodoString from './TodoString';
import { patchPost, checkedUpdate, patchTodoString } from './../redux/slices/ItemSlice';

const TextOfString = ({ todoStrings, _id, editing, setEditing, isEditable }) => {
  const dispatch = useAppDispatch();

  const [kostylUpdate, setKostylUpdate] = React.useState(false);
  const onEdit = (e) => {
    const id = e.currentTarget.id;
    const params = { todoStrings, id, _id };
    dispatch(openEditTodoString(params));
  };

  const handleChange = (e) => {
    const updated = [...editing];
    console.log('updated', updated);
    updated[e.target.id - 1].onChangeString = e.target.value;
    console.log('obj', updated[e.target.id - 1]);
    setEditing(updated);
  };

  const onAccept = (e) => {
    const id = e.currentTarget.id;
    const value = editing[e.currentTarget.id - 1].onChangeString;
    const params = { todoStrings, id, value, _id };

    dispatch(patchTodoString(params));
    dispatch(openEditTodoString(params));
    setKostylUpdate(!kostylUpdate);
  };

  const onDelete = (e) => {
    const id = e.currentTarget.id;
    const params = { todoStrings, id, _id };
    dispatch(deleteTodoString(params));
    setKostylUpdate(!kostylUpdate);
  };

  const onCheck = (e) => {
    console.log(e);
    const id = e.target.id;
    console.log('id', todoStrings);
    const params = { todoStrings, id, _id };
    dispatch(setCheked(params));
    setKostylUpdate(!kostylUpdate);
  };

  const todoStringsObj = { todoStrings };

  React.useEffect(() => {
    axios.patch(`posts/${_id}`, todoStringsObj, {
      headers: {
        Authorization: Cookies.get('token'),
      },
    });
  }, [kostylUpdate]);

  return (
    <Stack direction="column" alignItems="start" justifyContent="center">
      {todoStrings.map((obj) => (
        <Stack
          key={obj.id}
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
          className={styles.string}>
          {todoStrings[obj.id - 1].edit ? (
            <>
              <TextField
                fullWidth
                id={obj.id}
                value={editing[obj.id - 1].onChangeString}
                onChange={(event) => handleChange(event)}
                margin="normal"
              />
              <DoneIcon
                id={obj.id}
                className={styles.icons}
                color="success"
                onClick={(event) => onAccept(event)}
              />
              <CloseIcon
                className={styles.icons}
                color="error"
                id={obj.id}
                onClick={(event) => onEdit(event)}
              />
            </>
          ) : (
            <>
              <Checkbox
                disabled={!isEditable}
                checked={obj.cheked}
                id={obj.id}
                onClick={(event) => onCheck(event)}
              />
              <Typography>{obj.string}</Typography>
              {isEditable ? (
                <Stack className={styles.edit} direction="row">
                  <EditIcon id={obj.id} onClick={(event) => onEdit(event)} />
                  <DeleteForeverIcon id={obj.id} onClick={(event) => onDelete(event)} />
                </Stack>
              ) : null}
            </>
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default TextOfString;
