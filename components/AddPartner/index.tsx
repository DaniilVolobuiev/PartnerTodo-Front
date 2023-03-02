import styles from '../../styles/BurgerMenu/burgerMenu.module.scss';
import { useMount } from '../../utils/useMount';
import { CSSTransition } from 'react-transition-group';
import React from 'react';
import { Layout } from './layout';

export type BurgerProps = {
  opened: boolean;
  onClose: (value: boolean) => void;
};

export const AddPartner: React.FC<BurgerProps> = ({ opened, onClose }) => {
  const { mounted } = useMount({ opened });

  if (!mounted) {
    return null;
  }
  return <Layout onClose={onClose} opened={opened} />;
};
