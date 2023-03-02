import Register from '@/components/Register';
import styles from '../styles/Login.module.scss';

import React from 'react';

const register = () => {
  return (
    <div className={styles.background}>
      <Register />
    </div>
  );
};

export default register;
