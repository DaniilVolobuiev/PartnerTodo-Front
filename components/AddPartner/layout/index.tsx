import styles from '../../../styles/BurgerMenu/burgerMenu.module.scss';
import { CSSTransition } from 'react-transition-group';
import React from 'react';
import { BurgerProps } from '..';
import animationStyles from '../../../styles/BurgerMenu/animationStyles.module.scss';
import { ANIMATION_TIME } from '../../../variables';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Stack } from '@mui/material';
import { createPost } from '@/redux/slices/ItemSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addPartner } from '@/redux/slices/AuthSlice';

const overlayAnimation = {
  enter: animationStyles.overlayEnter,
  enterActive: animationStyles.overlayEnterActive,
  exit: animationStyles.overlayExit,
  exitActive: animationStyles.overlayExitActive,
};
const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive,
};

export const Layout: React.FC<BurgerProps> = ({ opened, onClose }) => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.authReducer.data);

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [animationIn, setAnimationIn] = React.useState(false);
  React.useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);

  type Inputs = {
    partnerName: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      partnerName: '',
    },

    mode: 'onSubmit',
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('data', data);
    await dispatch(addPartner(data));
  };

  return (
    <div className={styles.container}>
      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}>
        <div ref={overlayRef} className={styles.overlay} onClick={() => onClose(false)}></div>
      </CSSTransition>

      <CSSTransition
        in={animationIn}
        nodeRef={contentRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={contentAnimation}>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.fields}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                <TextField
                  label="Add your partner name"
                  {...register('partnerName')}
                  error={Boolean(errors.partnerName?.message)}
                  helperText={errors.partnerName?.message}
                  margin="normal"
                />
                <Button variant="contained" type="submit" onClick={() => onClose(false)}>
                  Add
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
