import { useEffect, useState, useContext } from 'react'
import api from '../../api/axios'
import { AuthContext } from '../../context/AuthContext'

const blank = { name: '', description: '', price: '', category: '', image: '', available: true }

const AdminMenu = () => {
  const { user } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [form, setForm] = useState(blank)
  const [editing, setEditing] = useState(null)
  const [msg, setMsg] = useState('')

  const load = () => api.get(`/menu?restaurantId=${user.restaurantId}`).then(({ data }) => setItems(data))
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/menu/${editing}`, form)
      } else {
        await api.post('/menu', form)
      }
      setForm(blank)
      setEditing(null)
      setMsg(editing ? 'Updated!' : 'Added!')
      load()
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error')
    }
  }

  const handleEdit = (item) => {
    setEditing(item._id)
    setForm({ name: item.name, description: item.description, price: item.price, category: item.category, image: item.image, available: item.available })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return
    await api.delete(`/menu/${id}`)
    load()
  }

  return (
    <div className="page">
      <h2>Manage Menu</h2>
      {msg && <p className="success">{msg}</p>}
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        </div>
        <div className="form-row">
          <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <input placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </div>
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <label className="checkbox-label">
          <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} />
          Available
        </label>
        <div className="form-actions">
          <button type="submit" className="btn-primary">{editing ? 'Update Item' : 'Add Item'}</button>
          {editing && <button type="button" className="btn-secondary" onClick={() => { setEditing(null); setForm(blank) }}>Cancel</button>}
        </div>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>Name</th><th>Category</th><th>Price</th><th>Available</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
              <td>{item.available ? '✅' : '❌'}</td>
              <td>
                <button className="btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn-danger-sm" onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminMenu
