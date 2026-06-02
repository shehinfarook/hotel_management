import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import api from '../../api/axios'

const MenuPage = () => {
  const [items, setItems] = useState([])
  const [category, setCategory] = useState('All')
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    api.get('/api/menu').then(({ data }) => setItems(data))
  }, [])

  const categories = ['All', ...new Set(items.map((i) => i.category))]
  const filtered = category === 'All' ? items : items.filter((i) => i.category === category)

  return (
    <div className="page">
      <h2>Our Menu</h2>
      <div className="category-tabs">
        {categories.map((c) => (
          <button
            key={c}
            className={`tab ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="menu-grid">
        {filtered.length === 0 && <p style={{color:'#888'}}>No menu items available yet.</p>}
        {filtered.map((item) => (
          <div key={item._id} className={`menu-card ${!item.available ? 'unavailable' : ''}`}>
            {item.image && <img src={item.image} alt={item.name} />}
            <div className="menu-card-body">
              <h4>{item.name}</h4>
              <p className="desc">{item.description}</p>
              <div className="menu-footer">
                <span className="price">₹{item.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(item)}
                  disabled={!item.available}
                  className="btn-primary"
                >
                  {item.available ? 'Add to Cart' : 'Unavailable'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuPage
