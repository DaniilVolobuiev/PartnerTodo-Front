import React from 'react';

import { TextField } from '@mui/material';

import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/AuthSlice';
import Router from 'next/router';

const SimpleMDE: any = dynamic((): any => import('react-simplemde-editor'), {
  ssr: false,
});
const createTodo = () => {
  const isAuth = useAppSelector(selectAuth);
  const [value, setValue] = React.useState('Add brief description');

  const onChange = React.useCallback((value: string) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellCheker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter text',
      status: true,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  React.useEffect(() => {
    if (!window.localStorage.getItem('token') && !isAuth) {
      Router.push('/');
    }
  }, [isAuth]);

  return (
    <>
      <TextField variant="standard" placeholder="Lodo header" fullWidth />
      <SimpleMDE value={value} onChange={onChange} options={options} />
      <TextField variant="standard" placeholder="Lodo item" fullWidth />
    </>
  );
};

export default createTodo;
