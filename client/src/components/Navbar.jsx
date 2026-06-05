import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setOpen(false)
  }

  const close = () => setOpen(false)

  const links = () => {
    if (!user) return (
      <>
        <Link to="/login" onClick={close}>Login</Link>
        <Link to="/register" onClick={close}>Register</Link>
      </>
    )
    if (user.role === 'user') return (
      <>
        <Link to="/menu" onClick={close}>Menu</Link>
        <Link to="/cart" onClick={close}>Cart {cart.length > 0 && <span className="badge">{cart.length}</span>}</Link>
        <Link to="/orders" onClick={close}>My Orders</Link>
      </>
    )
    if (user.role === 'admin') return (
      <>
        <Link to="/admin" onClick={close}>Dashboard</Link>
        <Link to="/admin/menu" onClick={close}>Menu</Link>
        <Link to="/admin/orders" onClick={close}>Orders</Link>
      </>
    )
    if (user.role === 'superadmin') return (
      <>
        <Link to="/super" onClick={close}>Dashboard</Link>
        <Link to="/super/restaurants" onClick={close}>Restaurants</Link>
        <Link to="/super/users" onClick={close}>Users</Link>
        <Link to="/super/orders" onClick={close}>Orders</Link>
      </>
    )
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-brand">🍽 RestaurantOS</Link>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="menu">
          <span /><span /><span />
        </button>
        <div className="nav-links desktop-nav">
          {links()}
          {user && (
            <>
              <span className="nav-user">{user.name}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          )}
        </div>
      </nav>

      {open && (
        <div className="mobile-nav">
          {links()}
          {user && (
            <>
              <span className="nav-user-mobile">{user.name}</span>
              <button onClick={handleLogout} className="btn-logout-mobile">Logout</button>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Navbar
