import { useEffect, useState } from 'react'
import api from '../../api/axios'

const blank = { name: '', address: '', phone: '' }

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const [form, setForm] = useState(blank)
  const [editing, setEditing] = useState(null)
  const [msg, setMsg] = useState('')

  const load = () => api.get('/api/super/restaurants').then(({ data }) => setRestaurants(data))
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/api/super/restaurants/${editing}`, form)
      } else {
        await api.post('/api/super/restaurants', form)
      }
      setForm(blank)
      setEditing(null)
      setMsg(editing ? 'Updated!' : 'Restaurant added!')
      load()
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error')
    }
  }

  const handleEdit = (r) => {
    setEditing(r._id)
    setForm({ name: r.name, address: r.address, phone: r.phone })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete restaurant?')) return
    await api.delete(`/api/super/restaurants/${id}`)
    load()
  }

  return (
    <div className="page">
      <h2>Restaurants</h2>
      {msg && <p className="success">{msg}</p>}
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input placeholder="Restaurant Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <div className="form-actions">
          <button type="submit" className="btn-primary">{editing ? 'Update' : 'Add Restaurant'}</button>
          {editing && <button type="button" className="btn-secondary" onClick={() => { setEditing(null); setForm(blank) }}>Cancel</button>}
        </div>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>Name</th><th>Address</th><th>Phone</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {restaurants.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.address || '—'}</td>
              <td>{r.phone || '—'}</td>
              <td>
                <button className="btn-sm" onClick={() => handleEdit(r)}>Edit</button>
                <button className="btn-danger-sm" onClick={() => handleDelete(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Restaurants
