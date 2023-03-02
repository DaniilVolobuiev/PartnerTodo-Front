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

const yourTodos = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectAuth);
  const items = useAppSelector((state) => state.itemsReducer.items);
  const userData = useAppSelector((state) => state.authReducer.data);
  console.log('userDta', userData.payload._id);

  React.useEffect(() => {
    dispatch(getItemsByUser(userData.payload._id));
  }, []);
  React.useEffect(() => {
    if (!isAuth) {
      Router.push('/');
    }
  }, [isAuth]);

  return (
    <div className={styles.background}>
      {items ? (
        <Grid
          container
          spacing={3}
          alignContent="start"
          justifyContent="center"
          pt="2rem"
          pb="2rem">
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

export default yourTodos;

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
