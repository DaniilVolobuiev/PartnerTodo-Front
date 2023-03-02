import axios from './axios';
import { ItemInterface } from './../redux/slices/ItemSlice';
import Cookies from 'js-cookie';
import { TodoStirngs } from '@/redux/slices/ItemSlice';

export const loginUser = async (params: Record<string, string>) => {
  const data = await axios.post('/auth/login', params);
  return data.data;
};

export const getAuth = async (token: string) => {
  const data = await axios.get('/auth/me', {
    headers: {
      Authorization: `Bearer${token}`,
    },
  });
  return data.data;
};

export const registerUser = async (params: Record<string, string>) => {
  const data = await axios.post('/auth/register', params);
  return data.data;
};

export const getAll = async () => {
  const data = await axios.get(`./posts/`);
  return data.data;
};

export const createTodo = async (params) => {
  console.log('params', params);
  const data = await axios.post(`./posts`, params, {
    headers: {
      Authorization: Cookies.get('token'),
    },
  });
  return data.data;
};

export const patchTodo = async ({ _id, newParams }) => {
  console.log('itemsTodoStrings', newParams);
  const todoStrings = { todoStrings: newParams };
  const data = await axios.patch<string[]>(`./posts/${_id}`, todoStrings, {
    headers: {
      Authorization: Cookies.get('token'),
    },
  });
  return data.data;
};

export const patchTodoStringReq = async (params) => {
  console.log('params', params);

  const todoStrings = { todoStrings: params.todoStrings };
  const data = await axios.patch<string[]>(`./posts/${params._id}`, todoStrings, {
    headers: {
      Authorization: Cookies.get('token'),
    },
  });
  return data.data;
};

export const likeTodo = async (_id, likedObj) => {
  likedObj = { liked: likedObj };
  const data = await axios.patch<string[]>(`./posts/${_id}`, likedObj, {
    headers: {
      Authorization: Cookies.get('token'),
    },
  });
  return data.data;
};

export const deleteTodo = async (_id) => {
  const data = await axios.delete(`./posts/${_id}`, {
    headers: {
      Authorization: Cookies.get('token'),
    },
  });
  return data.data;
};

export const getItemsByUserId = async (userID: string) => {
  console.log('userId', userID);
  const data = await axios.get(`./posts/${userID}`);
  return data.data;
};

export const postPartnerName = async (partnerName: Record<string, string>) => {
  try {
    console.log(partnerName);
    const data = await axios.put('./user/partner/', partnerName, {
      headers: {
        Authorization: Cookies.get('token'),
      },
    });
    return data.data;
  } catch (error) {
    window.alert('Not possible to find the user with this name');
  }
};
