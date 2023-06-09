import SignUp from './pages/singUp';
import SignIn from './pages/signIn';
import AddTask from './pages/addTask';
import Landing from './pages/Landing';
import HomePage from './pages/HomePage';
import Account from './pages/MyAccount';
import UpdateTask from './pages/updateTask';
import CalenderPage from './pages/Calenderpage';

// createBrowserRouter
import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom';

function Root() {
  return (
    <>
      <Outlet />
    </>
  );
}

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <HomePage />, path: '/home' },
        { element: <SignUp />, path: '/signUp' },
        { element: <SignIn />, path: '/signIn' },
        { element: <AddTask />, path: '/addTask' },
        { element: <Landing />, path: '/' },
        { element: <Landing />, path: '/landing' },
        { element: <HomePage />, path: '/HomePage' },
        { element: <Account />, path: '/account' },
        { element: <UpdateTask />, path: '/updateTask/:activity_id' },
        { element: <CalenderPage />, path: '/CalenderPage' },
      ],
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
