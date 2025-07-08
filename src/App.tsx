import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/layout';
import routes from './routes/index';

const App = () => {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <div>Error loading page</div>,
      children: routes,
    }
  ], { basename: '/besider/' });

  return (
    <RouterProvider
      future={{ v7_startTransition: true }}
      router={router}
    />
  );
};

export default App;