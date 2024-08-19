import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Profile from './pages/profile'
import Dashboard from './pages/dashboard'
import Board from './pages/Board'
import PrivateRoute from './pages/PrivateRoute'
import RoleBasedRoute from './components/RoleBasedRoute'
import AdminTasks from './pages/AdminTasks'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Routes>
        <Route path="/register" element={
          <>
            <SignUp />
          </>

        } />
        <Route path="/" element={
          <>

            <Home />
          </>

        } />
        <Route path="/login" element={
          <>
            <Login />
          </>
        } />
        <Route path="/dashboard" element={
          <>
            <PrivateRoute>
              <Navbar />
              <Dashboard />
            </PrivateRoute>
          </>
        } />
        <Route path="/create-board" element={
          <>
            <PrivateRoute>
              <Navbar />
              <Board />
            </PrivateRoute>
          </>
        } />
        <Route path="/profile" element={
          <>
            <PrivateRoute>
              <Navbar />
              <Profile />
            </PrivateRoute>
          </>
        } />
        {/* <Route path="/check-ad" element={
          <>
            <PrivateRoute>
            </PrivateRoute>
          </>
        } /> */}
        <Route path="/admin-panel" element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <Navbar />
            <AdminTasks />
          </RoleBasedRoute>
        } />

      </Routes>

    </>
  )
}

export default App
