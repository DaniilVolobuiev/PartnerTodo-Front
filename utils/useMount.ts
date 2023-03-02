import { useEffect, useState, useTransition } from 'react';

import { ANIMATION_TIME } from '../variables/index';
type qwet = {
  opened: boolean;
};
export const useMount = ({ opened }: qwet) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted && opened) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [opened]);
  console.log('mounted', mounted);
  console.log('opeend', opened);

  return {
    mounted,
  };
};
