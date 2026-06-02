import { createContext, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    const exists = cart.find((c) => c.menuItemId === item._id)
    if (exists) {
      setCart(cart.map((c) => (c.menuItemId === item._id ? { ...c, qty: c.qty + 1 } : c)))
    } else {
      setCart([...cart, { menuItemId: item._id, name: item.name, price: item.price, qty: 1, restaurantId: item.restaurantId }])
    }
  }

  const removeFromCart = (id) => setCart(cart.filter((c) => c.menuItemId !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id)
    setCart(cart.map((c) => (c.menuItemId === id ? { ...c, qty } : c)))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}
