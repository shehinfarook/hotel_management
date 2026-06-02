import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">🍽 RestaurantOS</Link>
      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {user.role === 'user' && (
              <>
                <Link to="/menu">Menu</Link>
                <Link to="/cart">Cart {cart.length > 0 && <span className="badge">{cart.length}</span>}</Link>
                <Link to="/orders">My Orders</Link>
              </>
            )}
            {user.role === 'admin' && (
              <>
                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/menu">Menu</Link>
                <Link to="/admin/orders">Orders</Link>
              </>
            )}
            {user.role === 'superadmin' && (
              <>
                <Link to="/super">Dashboard</Link>
                <Link to="/super/restaurants">Restaurants</Link>
                <Link to="/super/users">Users</Link>
                <Link to="/super/orders">Orders</Link>
              </>
            )}
            <span className="nav-user">{user.name}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
