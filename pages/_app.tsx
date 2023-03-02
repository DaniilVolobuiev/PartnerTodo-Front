import Navbar from '@/components/Navbar';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/redux/store';
import React from 'react';
import { useRouter } from 'next/router';

import { CreateLodo } from '@/components/CreateLodo';
import { useMount } from '@/utils/useMount';
import PageAnimationLayout from '@/components/PageAnimationLayout';
import { AddPartner } from '@/components/AddPartner';

import { ThemeProvider } from '@mui/material/styles/';
import { theme } from '../CustomUI/theme';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [openedCreate, setOpenedCreate] = React.useState<boolean>(false);
  const [openedAdd, setOpenedAdd] = React.useState<boolean>(false);
  return (
    <>
      <ThemeProvider theme={theme}>
        <PageAnimationLayout>
          <Navbar
            openedAdd={openedAdd}
            setOpenedAdd={setOpenedAdd}
            openedCreate={openedCreate}
            setOpenedCreate={setOpenedCreate}
          />

          {<CreateLodo opened={openedCreate} onClose={setOpenedCreate} />}
          {<AddPartner opened={openedAdd} onClose={setOpenedAdd} />}

          <Component {...pageProps} />
        </PageAnimationLayout>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(App);
