import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Loader from '../Loader/loader';

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

export default Layout;