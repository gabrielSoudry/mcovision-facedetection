import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  BrowserRouter,
  Routes,
  Navigate
} from "react-router-dom";
import LogIn from './routes/logIn';
import Dashboard from './routes/dashboard';
import { PrivateRoute } from './routes/privateRoute';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='login' element={<LogIn />}></Route>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  )
}

export default App 
