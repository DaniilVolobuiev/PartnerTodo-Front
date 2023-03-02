import React from 'react';
import { Paper, TextField, Input, Button, Stack, Typography } from '@mui/material';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import styles from '../styles/Login.module.scss';
import Link from 'next/link';

import { selectAuth, getUserData, registerUser } from '@/redux/slices/AuthSlice';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import Router from 'next/router';

const Register = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  interface IFormInput {
    fullName?: string;
    email: string;
    password: string;
  }

  const onSubmit = async (values: Record<string, string>) => {
    const data = await dispatch(registerUser(values));
    console.log(values);
    if (!data.payload) {
      return alert('Not possible to login');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
    console.log('isAuth', isAuth);
  };

  React.useEffect(() => {
    if (isAuth) Router.push('/');
  }, [isAuth]);
  return (
    <div>
      <Paper className={styles.wrapper} elevation={12}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            type="text"
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            {...register('fullName', { required: 'Type your name' })}
          />
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

          <Button disabled={!isValid} type="submit" variant="contained">
            Register
          </Button>
        </form>
        <Stack alignItems="center">
          <Typography>Already have an account?</Typography>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </Stack>
      </Paper>
    </div>
  );
};

export default Register;
