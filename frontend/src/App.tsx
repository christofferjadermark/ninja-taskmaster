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
      <nav>
        <ul>
          <li>
            <Link to="/home">Hem</Link>
          </li>
          <li>
            <Link to="/">Logga in</Link>
          </li>
          <li>
            <button onClick={()=>localStorage.removeItem("user_id")}>Logga ut</button>
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
