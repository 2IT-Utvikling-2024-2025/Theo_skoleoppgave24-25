import { Routes, Route, Navigate } from 'react-router-dom'

import Admin         from './pages/Admin'
import Register      from './pages/Register'      // admin-register
import Edit          from './pages/Edit'          // admin-edit
import UserRegister  from './pages/UserRegister'  // bruker-register
import UserLogin     from './pages/UserLogin'     // bruker-login
import UserDashboard from './pages/UserDashboard' // bruker-dash

export default function App() {
  return (
    <Routes>
      {/* Admin */}
      <Route path="/admin"          element={<Admin />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin/edit/:id" element={<Edit />} />

      {/* Bruker */}
      <Route path="/user/register"  element={<UserRegister />} />
      <Route path="/user/login"     element={<UserLogin />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />

      {/* Default & 404 */}
      <Route path="/" element={<Navigate to="/user/login" replace />} />
      <Route path="*" element={<h1>404 – Siden finnes ikke</h1>} />
    </Routes>
  )
}
