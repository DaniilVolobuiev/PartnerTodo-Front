import { styled } from '@mui/material/styles/';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/icons-material';

const AddButton = styled(AddIcon)({
  background: 'linear-gradient(to right, #E48E66 50%, #D18162 50%)',
  border: 0,
  borderRadius: 20,
  color: 'yellow',
  width: '100%',
  height: '100%',

  icon: {
    marginLeft: 10,
    background: 'linear-gradient(to right, #E48E66 50%, #D18162 50%)',
  },
});

export default AddButton;
