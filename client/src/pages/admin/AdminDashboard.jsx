import { useEffect, useState } from 'react'
import api from '../../api/axios'

const AdminDashboard = () => {
  const [stats, setStats] = useState({ orders: 0, pending: 0, revenue: 0, menu: 0 })

  useEffect(() => {
    Promise.all([api.get('/orders/restaurant'), api.get('/menu')]).then(([ordersRes, menuRes]) => {
      const orders = ordersRes.data
      const revenue = orders
        .filter((o) => o.status === 'delivered')
        .reduce((sum, o) => sum + o.totalAmount, 0)
      setStats({
        orders: orders.length,
        pending: orders.filter((o) => o.status === 'pending').length,
        revenue,
        menu: menuRes.data.length
      })
    })
  }, [])

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.orders}</h3>
          <p>Total Orders</p>
        </div>
        <div className="stat-card">
          <h3>{stats.pending}</h3>
          <p>Pending Orders</p>
        </div>
        <div className="stat-card">
          <h3>₹{stats.revenue.toFixed(2)}</h3>
          <p>Revenue</p>
        </div>
        <div className="stat-card">
          <h3>{stats.menu}</h3>
          <p>Menu Items</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
