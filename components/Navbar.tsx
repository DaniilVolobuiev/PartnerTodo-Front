import Link from 'next/link';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';

import AddUser from '../assets/icons/add-user.png';
import AddTodo from '../assets/icons/calendar.png';
import LogOut from '../assets/icons/check-out.png';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/AuthSlice';
import { logout } from '@/redux/slices/AuthSlice';
import styles from '../styles/Navbar.module.scss';
import Image from 'next/image';

interface NavbarProps {
  opened: boolean;
  onClose: () => void;
}

export default function Navbar({
  openedAdd,
  setOpenedAdd,
  openedCreate,
  setOpenedCreate,
}: NavbarProps) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.authReducer.data);

  const onLogout = React.useCallback(() => {
    window.localStorage.removeItem('token');
    dispatch(logout());
  }, []);

  const openCreate = () => {
    setOpenedCreate(true);
  };

  const openAdd = () => {
    setOpenedAdd(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {userData ? (
            <>
              {' '}
              <Tooltip title="Add New Todo">
                <IconButton
                  onClick={openCreate}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}>
                  <Image src={AddTodo} alt="Add Todo" width={40} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Todo Partner">
                <IconButton
                  onClick={openAdd}
                  size="large"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2 }}>
                  <Image src={AddUser} alt="Add User" width={40} />
                </IconButton>
              </Tooltip>{' '}
            </>
          ) : null}
          <Typography
            variant="overline"
            component="div"
            sx={{ flexGrow: 1 }}
            display="flex"
            gap="2rem">
            <Link href="/allTodos" className={styles.link}>
              All lodos
            </Link>
            <Link href="/loveTodos" className={styles.link}>
              Your love lodos
            </Link>
            <Link href="/yourTodos" className={styles.link}>
              Your lodos
            </Link>
          </Typography>
          <Tooltip title="Log Out">
            <Button color="inherit" onClick={onLogout}>
              <Image src={LogOut} alt="Log Out" width={40} />
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
