import Login from './Login'
import Home from './Home'

// createBrowserRouter
import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider
} from 'react-router-dom'

function Root() {
  return (
    <>
    <nav className="bg-primary py-4">
      <ul className="flex justify-center">
        <li className="mr-4">
          <Link
            to="/home"
            className="text-secondary font-semibold hover:text-gray-200"
          >
            Hem
          </Link>
        </li>
        <li className="mr-4">
          <Link
            to="/"
            className="text-secondary font-semibold hover:text-gray-200"
          >
            Logga in
          </Link>
        </li>
        <li>
          <button
            onClick={() => localStorage.removeItem("user_id")}
            className="text-secondary font-semibold hover:text-gray-200"
          >
            Logga ut
          </button>
        </li>
      </ul>
    </nav>
    <Outlet />
  </>
  )
}

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: '/home' },
        { element: <Login />, path: '/' },
      ],
      element: <Root />
    }
  ])
  return <RouterProvider router={router} />
}

export default App
