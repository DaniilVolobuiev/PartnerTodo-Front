import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    overrides: {
      // For label
      Typography: {
        root: {
          "& .hidden-button": {
            display: "none"
          },
          "&:hover .hidden-button": {
            display: "flex"
          }
        }
      }
    }
  });