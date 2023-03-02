import React from 'react';
import { Stack, TextField, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import styles from '../styles/newTodo.module.scss';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { addTodoString, TodoStirngs, patchPost } from '@/redux/slices/ItemSlice';
import axios from '../API/axios';

import Cookies from 'js-cookie';

import TextOfString from './TextOfString';
import { ItemInterface } from './../redux/slices/ItemSlice';
import AddButton from '@/CustomUI/AddButton';

const TodoString: React.FC<any> = ({ todoStrings, _id, isEditable }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.itemsReducer.items);

  const [editing, setEditing] = React.useState(todoStrings.map((obj: TodoStirngs) => ({ ...obj })));

  const [newItems, setNewItems] = React.useState<string[]>([]);
  const [textFieldValue, setTextFieldValue] = React.useState('');

  React.useEffect(() => {
    setEditing(todoStrings.map((obj: TodoStirngs) => ({ ...obj })));
  }, [todoStrings]);
  const onAdd = () => {
    setNewItems(['item', ...newItems]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextFieldValue(event.target.value);
  };

  const deleteNew = () => {
    setNewItems([]);
    setTextFieldValue('');
  };

  const addNew = async () => {
    const params = { todoStrings, _id, textFieldValue, items };
    await dispatch(patchPost(params));
    setNewItems([]);
    setTextFieldValue('');
  };

  // const todoStringsObj = { todoStrings };

  // React.useEffect(() => {
  //   axios.patch(`posts/${_id}`, todoStringsObj, {
  //     headers: {
  //       Authorization: Cookies.get('token'),
  //     },
  //   });
  // }, [kostyl]);
  return (
    <Stack gap="1rem" justifyContent="center" alignItems="start">
      <TextOfString
        todoStrings={todoStrings}
        _id={_id}
        editing={editing}
        setEditing={setEditing}
        isEditable={isEditable}
      />

      <Stack direction="row" alignItems="center" justifyContent="start" gap="2rem" flexBasis="1">
        {isEditable ? (
          !newItems.length ? (
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={onAdd}
              disabled={newItems.length > 0}>
              <AddButton />
            </Fab>
          ) : null
        ) : null}
        {newItems &&
          newItems.map((index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap="1rem">
              <TextField
                fullWidth
                value={textFieldValue}
                onChange={(event) => handleChange(event)}></TextField>
              <CloseIcon color="error" className={styles.icons} onClick={deleteNew} />
              <DoneIcon color="success" className={styles.icons} onClick={addNew} />
            </Stack>
          ))}
      </Stack>
    </Stack>
  ) as any;
};

export default TodoString;
