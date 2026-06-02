import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import MenuPage from './pages/user/MenuPage'
import CartPage from './pages/user/CartPage'
import MyOrders from './pages/user/MyOrders'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminMenu from './pages/admin/AdminMenu'
import AdminOrders from './pages/admin/AdminOrders'

import SuperDashboard from './pages/superadmin/SuperDashboard'
import Restaurants from './pages/superadmin/Restaurants'
import Users from './pages/superadmin/Users'
import SuperOrders from './pages/superadmin/SuperOrders'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/menu" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/menu" element={<ProtectedRoute roles={['user']}><MenuPage /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute roles={['user']}><CartPage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute roles={['user']}><MyOrders /></ProtectedRoute>} />

            <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/menu" element={<ProtectedRoute roles={['admin']}><AdminMenu /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute roles={['admin']}><AdminOrders /></ProtectedRoute>} />

            <Route path="/super" element={<ProtectedRoute roles={['superadmin']}><SuperDashboard /></ProtectedRoute>} />
            <Route path="/super/restaurants" element={<ProtectedRoute roles={['superadmin']}><Restaurants /></ProtectedRoute>} />
            <Route path="/super/users" element={<ProtectedRoute roles={['superadmin']}><Users /></ProtectedRoute>} />
            <Route path="/super/orders" element={<ProtectedRoute roles={['superadmin']}><SuperOrders /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
