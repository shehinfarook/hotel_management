import { useEffect, useState } from 'react'
import api from '../../api/axios'

const SuperDashboard = () => {
  const [stats, setStats] = useState({ restaurants: 0, users: 0, orders: 0, revenue: 0 })

  useEffect(() => {
    Promise.all([
      api.get('/api/super/restaurants'),
      api.get('/api/super/users'),
      api.get('/api/orders/all')
    ]).then(([rRes, uRes, oRes]) => {
      const revenue = oRes.data
        .filter((o) => o.status === 'delivered')
        .reduce((sum, o) => sum + o.totalAmount, 0)
      setStats({
        restaurants: rRes.data.length,
        users: uRes.data.filter((u) => u.role === 'user').length,
        orders: oRes.data.length,
        revenue
      })
    })
  }, [])

  return (
    <div className="page">
      <h2>Super Admin Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.restaurants}</h3>
          <p>Restaurants</p>
        </div>
        <div className="stat-card">
          <h3>{stats.users}</h3>
          <p>Users</p>
        </div>
        <div className="stat-card">
          <h3>{stats.orders}</h3>
          <p>Total Orders</p>
        </div>
        <div className="stat-card">
          <h3>₹{stats.revenue.toFixed(2)}</h3>
          <p>Total Revenue</p>
        </div>
      </div>
    </div>
  )
}

export default SuperDashboard
