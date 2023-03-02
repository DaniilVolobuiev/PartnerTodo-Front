import React from 'react';
import { Grid } from '@mui/material';
import TodoItem from '@/components/TodoItem';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

import { selectAuth, login } from '@/redux/slices/AuthSlice';
import { getItems, getItemsByUser } from '@/redux/slices/ItemSlice';
import Router from 'next/router';
import styles from '../styles/allLodos.module.scss';

import { wrapper } from '@/redux/store';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { getMe } from '@/redux/slices/AuthSlice';

const allTodos = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectAuth);
  const items = useAppSelector((state) => state.itemsReducer.items);
  const userData = useAppSelector((state) => state.authReducer.data);

  console.log('UserData', userData?.payload);
  console.log('items', items);

  React.useEffect(() => {
    dispatch(getItems());
  }, []);
  React.useEffect(() => {
    if (!isAuth) {
      Router.push('/');
    }
  }, [isAuth]);

  return (
    <div className={styles.background}>
      {items ? (
        <Grid container spacing={3} justifyContent="center" pt="2rem" pb="2rem">
          {items.map((obj) => (
            <Grid item zeroMinWidth>
              <TodoItem {...obj} key={obj._id} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default allTodos;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
      const { token } = parseCookies(ctx);
      console.log('token', token);
      const userData = await store.dispatch(getMe(token));
      store.dispatch(login(userData));
      console.log(userData);
      return { props: {} };
    } catch (error) {
      console.log(error);
      return { props: {} };
    }
  },
);
