import Login from './Login';
import Home from './Home';
import SignUp from './singUp';
import SignIn from './pages/signIn';
import AddTask from './pages/addTask';
import Landing from './pages/Landing';
import HomePage from './pages/HomePage';

// createBrowserRouter
import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

function Root() {
  return (
    <>
      <nav className="bg-primary py-4">
        <ul className="flex justify-center">
          {/* <li className="mr-4">
            <Link
              to="/home"
              className="font-semibold text-secondary hover:text-gray-200"
            >
              Hem
            </Link>
          </li> */}
          <li className="mr-4">
            <Link
              to="/"
              className="font-semibold text-secondary hover:text-gray-200"
            >
              Logga in
            </Link>
          </li>
          <li className="mr-4">
            <Link
              to="/signUp"
              className="font-semibold text-secondary hover:text-gray-200"
            >
              Skapa Konto
            </Link>
          </li>
          <li className="mr-4">
            <Link
              to="/addTask"
              className="font-semibold text-secondary hover:text-gray-200"
            >
              Add Task
            </Link>
          </li>
          <li className="mr-4">
            <Link
              to="/signIn"
              className="font-semibold text-secondary hover:text-gray-200"
            >
              Sign in
            </Link>
          </li>
          <li>
            <button
              onClick={() => localStorage.removeItem('user_id')}
              className="font-semibold text-secondary hover:text-gray-200"
            >
              Logga ut
            </button>
          </li>
          <li className="mr-4">
            <Link
              to="/Landing"
              className="font-semibold text-secondary hover:text-gray-200"
            >
              Landing
            </Link>
          </li>
          <li className="mr-4">
            <Link
              to="/HomePage"
              className="font-semibold text-secondary hover:text-gray-200"
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: '/home' },
        { element: <SignUp />, path: '/signUp' },
        { element: <SignIn />, path: '/signIn' },
        { element: <AddTask />, path: '/addTask' },
        { element: <Login />, path: '/' },
        { element: <Landing />, path: '/landing' },
        { element: <HomePage />, path: '/HomePage' },
      ],
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
