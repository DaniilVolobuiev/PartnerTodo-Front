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
    title: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
    },

    mode: 'onSubmit',
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const params = {
      ...data,
      todoStrings: { id: 1, string: 'default value', edit: false },
      userName: userData.payload.fullName,
    };
    dispatch(createPost(params));
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
                  label="Short Todo Description"
                  {...register('title')}
                  error={Boolean(errors.title?.message)}
                  helperText={errors.title?.message}
                  margin="normal"
                />
                <Button variant="contained" type="submit" onClick={() => onClose(false)}>
                  Create
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
