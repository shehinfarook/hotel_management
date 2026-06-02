import { useEffect, useState } from 'react'
import api from '../../api/axios'
import StatusBadge from '../../components/StatusBadge'

const SuperOrders = () => {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.get('/api/orders/all').then(({ data }) => setOrders(data))
  }, [])

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  return (
    <div className="page">
      <h2>All Orders</h2>
      <div className="category-tabs">
        {['all', 'pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'].map((s) => (
          <button key={s} className={`tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>
      {filtered.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <span className="order-id">#{order._id.slice(-6).toUpperCase()}</span>
            <StatusBadge status={order.status} />
            <span className="order-date">{new Date(order.createdAt).toLocaleString()}</span>
            <span className="customer-name">{order.userId?.name}</span>
            <span className="restaurant-name">🏠 {order.restaurantId?.name}</span>
          </div>
          <div className="order-items">
            {order.items.map((item, i) => (
              <span key={i} className="order-item-tag">{item.name} x{item.qty}</span>
            ))}
          </div>
          <div className="order-total">Total: <strong>₹{order.totalAmount.toFixed(2)}</strong></div>
        </div>
      ))}
    </div>
  )
}

export default SuperOrders
