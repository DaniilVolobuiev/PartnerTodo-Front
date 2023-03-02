import React from 'react';
import { Paper, TextField, Input, Button, Stack, Typography } from '@mui/material';
import { setCookie } from 'nookies';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import styles from '../styles/Login.module.scss';
import Link from 'next/link';
import { selectAuth, login } from './../redux/slices/AuthSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import Router from 'next/router';

import { loginUser } from '@/API/requests';

const Login = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },

    mode: 'onSubmit',
  });

  interface IFormInput {
    name?: string;
    email: string;
    password: string;
  }

  const onSubmit = async (values: Record<string, string>) => {
    const data = await loginUser(values);

    dispatch(login(data));
    console.log('data', data);
    if (!data) {
      return alert('Not possible to login');
    }
    console.log('data2', data);
    if ('token' in data) {
      setCookie(null, 'token', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    }
    console.log('isAuth', isAuth);
  };

  React.useEffect(() => {
    if (isAuth) Router.push('/allTodos');
  }, [isAuth]);
  return (
    <div>
      <Paper className={styles.wrapper} elevation={12}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Type your email' })}
          />

          <TextField
            label="Password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Type your password' })}
          />

          <Button type="submit" variant="contained">
            Login
          </Button>
        </form>
        <Stack alignItems="center">
          <Typography>Do not have an account yet?</Typography>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </Stack>
      </Paper>
    </div>
  );
};

export default Login;
