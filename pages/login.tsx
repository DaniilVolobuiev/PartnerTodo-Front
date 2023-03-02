import Login from '@/components/Login';
import styles from '../styles/Login.module.scss';

import React from 'react';

const login = () => {
  return (
    <div className={styles.background}>
      <Login />
    </div>
  );
};

export default login;
