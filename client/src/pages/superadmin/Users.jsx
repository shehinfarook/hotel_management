import { useEffect, useState } from 'react'
import api from '../../api/axios'

const Users = () => {
  const [users, setUsers] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [selected, setSelected] = useState({ userId: '', restaurantId: '' })
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/super/users').then(({ data }) => setUsers(data))
    api.get('/super/restaurants').then(({ data }) => setRestaurants(data))
  }, [])

  const assignAdmin = async (e) => {
    e.preventDefault()
    try {
      await api.post('/super/assign-admin', selected)
      setMsg('Admin assigned!')
      api.get('/super/users').then(({ data }) => setUsers(data))
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="page">
      <h2>Users</h2>
      {msg && <p className="success">{msg}</p>}

      <div className="admin-form">
        <h4>Assign Admin Role</h4>
        <form onSubmit={assignAdmin} className="form-row">
          <select value={selected.userId} onChange={(e) => setSelected({ ...selected, userId: e.target.value })} required>
            <option value="">Select User</option>
            {users.filter((u) => u.role === 'user').map((u) => (
              <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
            ))}
          </select>
          <select value={selected.restaurantId} onChange={(e) => setSelected({ ...selected, restaurantId: e.target.value })} required>
            <option value="">Select Restaurant</option>
            {restaurants.map((r) => (
              <option key={r._id} value={r._id}>{r.name}</option>
            ))}
          </select>
          <button type="submit" className="btn-primary">Assign</button>
        </form>
      </div>

      <table className="data-table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Restaurant</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td><span className={`role-tag ${u.role}`}>{u.role}</span></td>
              <td>{u.restaurantId ? restaurants.find((r) => r._id === u.restaurantId)?.name || u.restaurantId : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
