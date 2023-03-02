import React from 'react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppSelector } from '@/redux/hooks';
import {
  deletePost,
  ItemInterface,
  likePost,
  patchPost,
  setLiked,
} from './../redux/slices/ItemSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import TodoString from './TodoString';
import { TextField, useRadioGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material';
import { useAppDispatch } from './../redux/hooks/index';
import Cookies from 'js-cookie';
import axios from '../API/axios';
import { wrapper } from '@/redux/store';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { getMe } from '@/redux/slices/AuthSlice';
import Image from 'next/image';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const TodoItem = React.memo(function TodoItem({
  _id,
  title,
  createdAt,

  user,
  todoStrings,
  liked,
  userName,
  avatarURL,
}: ItemInterface) {
  const userData = useAppSelector((state) => state.authReducer.data);
  const isEditable = user._id === userData?.payload._id;
  const derik = () => {
    console.log('user', user);
    console.log('isEditable', isEditable);
    console.log('obj.id', userData?.payload._id);
  };

  const dispatch = useAppDispatch();
  const onLike = async () => {
    console.log('liked inTodo Item', liked);
    const params = { _id, liked };

    // dispatch(setLiked(params));
    await dispatch(likePost(params));
    // dispatch(likePost(params));
    // const likedObj = { liked };
    // console.log('effectLike', liked);
    // axios.patch(`posts/${_id}`, likedObj, {
    //   headers: {
    //     Authorization: Cookies.get('token'),
    //   },
    // });
  };

  const date = createdAt.slice(0, 10);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteTodo = () => {
    dispatch(deletePost(_id));
  };

  // React.useEffect(() => {
  //   const likedObj = { liked };
  //   console.log('effectLike', liked);

  //   axios.patch(`posts/${_id}`, likedObj, {
  //     headers: {
  //       Authorization: Cookies.get('token'),
  //     },
  //   });
  // }, [kostylUpdate]);
  console.log('obj.id', _id);
  return (
    <Card sx={{ width: 345 }} onClick={derik} elevation="12">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="title">
            <Image src={avatarURL} alt="A" />
          </Avatar>
        }
        title={userName}
        subheader={date}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onLike}>
          <FavoriteIcon color={liked ? 'error' : 'disabled'} />
        </IconButton>
        {isEditable ? (
          <>
            <IconButton aria-label="delete">
              <DeleteForeverIcon onClick={deleteTodo} />
            </IconButton>
          </>
        ) : null}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TodoString todoStrings={todoStrings} _id={_id} isEditable={isEditable} />
        </CardContent>
      </Collapse>
    </Card>
  );
});
export default TodoItem;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
      const { token } = parseCookies(ctx);
      console.log('token', token);
      const userData = await store.dispatch(getMe(token));
      store.dispatch(login(userData));
      console.log(userData);
      return { props: {} };
    } catch (error) {
      console.log(error);
      return { props: {} };
    }
  },
);
