import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import api from '../../api/axios'

const CartPage = () => {
  const { cart, updateQty, removeFromCart, clearCart, total } = useContext(CartContext)
  const [note, setNote] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const placeOrder = async () => {
    if (!cart.length) return
    try {
      const restaurantId = cart[0].restaurantId
      await api.post('/orders', { items: cart, restaurantId, note })
      clearCart()
      setMsg('Order placed!')
      setTimeout(() => navigate('/orders'), 1500)
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to place order')
    }
  }

  if (!cart.length && !msg) return (
    <div className="page centered">
      <p>Your cart is empty. <a href="/menu">Browse menu</a></p>
    </div>
  )

  return (
    <div className="page">
      <h2>Cart</h2>
      {msg && <p className="success">{msg}</p>}
      {cart.map((item) => (
        <div key={item.menuItemId} className="cart-row">
          <span className="cart-name">{item.name}</span>
          <div className="qty-control">
            <button onClick={() => updateQty(item.menuItemId, item.qty - 1)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => updateQty(item.menuItemId, item.qty + 1)}>+</button>
          </div>
          <span>₹{(item.price * item.qty).toFixed(2)}</span>
          <button className="btn-danger-sm" onClick={() => removeFromCart(item.menuItemId)}>✕</button>
        </div>
      ))}
      <div className="cart-total">
        <strong>Total: ₹{total.toFixed(2)}</strong>
      </div>
      <textarea
        placeholder="Special instructions (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="note-input"
      />
      <button className="btn-primary" onClick={placeOrder}>Place Order</button>
    </div>
  )
}

export default CartPage
