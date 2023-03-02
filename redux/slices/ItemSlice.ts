import { imageListItemClasses } from '@mui/material/ImageListItem';
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

import axios from '../../API/axios';
import TodoString from './../../components/TodoString';
import {
  getAll,
  createTodo,
  likeTodo,
  patchTodo,
  deleteTodo,
  getItemsByUserId,
  patchTodoStringReq,
} from '@/API/requests';
import Cookies from 'js-cookie';

export type TodoStirngs = {
  id: number;
  string: string;
  edit: boolean;
  onChangeString?: string;
  cheked: boolean;
};

export interface ItemInterface {
  _id: string;
  createdAt: string;
  updatedAt: string;

  title: string;
  user: any;
  isEditable: boolean;
  todoStrings: TodoStirngs[];
  token: string;
  liked: boolean;
  userName: string;
}

export const getItems = createAsyncThunk('items/getItemsStatus', () => {
  return getAll();
});

export const getItemsByUser = createAsyncThunk('items/getItemsByUserStatus', (userID) => {
  return getItemsByUserId(userID);
});

export const patchPost = createAsyncThunk('items/patchPost', async (params: any) => {
  console.log('paramsPatch', params);

  const newParams = [
    ...params.todoStrings,
    {
      id: params.todoStrings.length + 1,
      string: params.textFieldValue,
      edit: false,
    },
  ];
  const todoStrings = { newParams: newParams, _id: params._id };
  console.log('newParams', newParams);
  return patchTodo(todoStrings);
});

export const patchTodoString = createAsyncThunk(
  'items/patchTodoString',
  async ({ todoStrings, id, value }) => {},
);

export const likePost = createAsyncThunk('items/likePost', async ({ _id, liked }: any) => {
  liked = !liked;
  return likeTodo(_id, liked);
});

export const deletePost = createAsyncThunk('items/deletePost', async (_id: string) => {
  return deleteTodo(_id);
});

export const createPost = createAsyncThunk(
  'items/createPost',
  async (params: Record<string, string>) => {
    return createTodo(params);
  },
);

export const checkedUpdate = createAsyncThunk(
  'items/checkedUpdate',
  async ({ id, _id, todoStrings }, { getState }) => {
    await patchTodo(params);
    const updatedData = [(todoStrings[id].cheked = !todoStrings[id].cheked)];
    const currentState = getState();
    currentState.todoStirngs[id].cheked = updatedData;
    return updatedData;
  },
);

interface ItemsSliceState {
  items: ItemInterface[];
  status: 'loading' | 'success' | 'error';
}

const initialState: ItemsSliceState = {
  items: [],
  status: 'loading',
};

export const itemsReducer = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addTodoString(state, action) {
      const findObj = state.items.find((obj) => action.payload._id == obj._id);
      findObj?.todoStrings.push({
        id: action.payload.todoStrings.length + 1,
        string: action.payload.textFieldValue,
        onChangeString: '',
        edit: false,
      });
    },

    editTodoString(state, action) {},

    openEditTodoString(state, action) {
      const findObj = state.items.find((obj) => action.payload._id == obj._id);
      if (findObj) {
        findObj.todoStrings[action.payload.id - 1].edit =
          !findObj.todoStrings[action.payload.id - 1].edit;
      }
    },

    deleteTodoString(state, action) {
      const findObj = state.items.find((obj) => action.payload._id == obj._id);

      console.log('id', action.payload.id);
      if (findObj) {
        findObj.todoStrings = findObj?.todoStrings?.filter((obj) => obj.id != action.payload.id);
      }
    },

    setLiked(state, action) {
      const findObj = state.items.find((obj) => action.payload._id == obj._id);
      if (findObj) {
        findObj.liked = !findObj.liked;
      }
    },
    setCheked(state, action) {
      const findObj = state.items.find((obj) => action.payload._id == obj._id);
      const id = action.payload.todoStrings.id;
      console.log('findObj', current(findObj));
      console.log('action', action);
      if (findObj) {
        findObj.todoStrings[action.payload.id - 1].cheked =
          !findObj.todoStrings[action.payload.id - 1].cheked;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(getItems.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });

    builder.addCase(getItemsByUser.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(getItemsByUser.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(getItemsByUser.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.meta.arg);
    });

    builder.addCase(checkedUpdate.pending, (state, action) => {
      const findObj = state.items.find((obj) => action.meta.arg._id == obj._id);
      if (findObj) {
        findObj.todoStrings[action.meta.arg.id - 1].cheked =
          !findObj.todoStrings[action.meta.arg.id - 1].cheked;
      }
    });

    builder.addCase(likePost.fulfilled, (state, action) => {
      const findObj = state.items.find((obj) => action.meta.arg._id == obj._id);
      console.log('action.meta', action.meta);
      if (findObj) {
        findObj.liked = !findObj.liked;
      }
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(patchPost.fulfilled, (state, action) => {
      const findObj = state.items.find((obj) => action.meta.arg._id == obj._id);
      console.log('find', current(findObj));
      findObj?.todoStrings?.push({
        id: action.meta.arg.todoStrings.length + 1,
        string: action.meta.arg.value,
        edit: false,
      });
    });

    builder.addCase(patchTodoString.pending, (state, action) => {
      const findObj = state.items.find((obj) => action.meta.arg._id == obj._id);
      console.log('arg', action.meta.arg);
      console.log('find', current(findObj.todoStrings));

      findObj.todoStrings[action.meta.arg.id - 1].string = action.meta.arg.value;
    });
  },
});

export const {
  addTodoString,
  editTodoString,
  openEditTodoString,
  deleteTodoString,
  setLiked,
  setCheked,
} = itemsReducer.actions;

export default itemsReducer.reducer;
