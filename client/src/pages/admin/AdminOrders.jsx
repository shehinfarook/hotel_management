import { useEffect, useState } from 'react'
import api from '../../api/axios'
import StatusBadge from '../../components/StatusBadge'

const NEXT_STATUS = {
  pending: 'confirmed',
  confirmed: 'preparing',
  preparing: 'ready',
  ready: 'delivered'
}

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')

  const load = () => api.get('/api/orders/restaurant').then(({ data }) => setOrders(data))

  useEffect(() => {
    load()
    const interval = setInterval(load, 15000)
    return () => clearInterval(interval)
  }, [])

  const advance = async (id, status) => {
    await api.put(`/api/orders/${id}/status`, { status })
    load()
  }

  const cancel = async (id) => {
    if (!window.confirm('Cancel this order?')) return
    await api.put(`/api/orders/${id}/status`, { status: 'cancelled' })
    load()
  }

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  return (
    <div className="page">
      <h2>Orders</h2>
      <div className="category-tabs">
        {['all', 'pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'].map((s) => (
          <button key={s} className={`tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 && <p>No orders here.</p>}
      {filtered.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <span className="order-id">#{order._id.slice(-6).toUpperCase()}</span>
            <StatusBadge status={order.status} />
            <span className="order-date">{new Date(order.createdAt).toLocaleString()}</span>
            <span className="customer-name">{order.userId?.name}</span>
          </div>
          <div className="order-items">
            {order.items.map((item, i) => (
              <span key={i} className="order-item-tag">{item.name} x{item.qty}</span>
            ))}
          </div>
          <div className="order-footer">
            <span>Total: <strong>₹{order.totalAmount.toFixed(2)}</strong></span>
            {order.note && <span className="order-note">📝 {order.note}</span>}
            <div className="order-actions">
              {NEXT_STATUS[order.status] && (
                <button className="btn-primary btn-sm" onClick={() => advance(order._id, NEXT_STATUS[order.status])}>
                  Mark as {NEXT_STATUS[order.status]}
                </button>
              )}
              {!['delivered', 'cancelled'].includes(order.status) && (
                <button className="btn-danger-sm" onClick={() => cancel(order._id)}>Cancel</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminOrders
