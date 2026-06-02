import { useEffect, useState } from 'react'
import api from '../../api/axios'
import StatusBadge from '../../components/StatusBadge'

const ORDER_FLOW = ['pending', 'confirmed', 'preparing', 'ready', 'delivered']

const MyOrders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    api.get('/api/orders/my').then(({ data }) => setOrders(data))
    const interval = setInterval(() => {
      api.get('/api/orders/my').then(({ data }) => setOrders(data))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="page">
      <h2>My Orders</h2>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <span className="order-id">#{order._id.slice(-6).toUpperCase()}</span>
            <StatusBadge status={order.status} />
            <span className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
          </div>
          <div className="order-tracker">
            {ORDER_FLOW.map((step, idx) => (
              <div key={step} className={`tracker-step ${ORDER_FLOW.indexOf(order.status) >= idx ? 'done' : ''}`}>
                <div className="tracker-dot" />
                <span>{step}</span>
              </div>
            ))}
          </div>
          <div className="order-items">
            {order.items.map((item, i) => (
              <span key={i} className="order-item-tag">{item.name} x{item.qty}</span>
            ))}
          </div>
          <div className="order-total">Total: <strong>₹{order.totalAmount.toFixed(2)}</strong></div>
          {order.note && <p className="order-note">Note: {order.note}</p>}
        </div>
      ))}
    </div>
  )
}

export default MyOrders
