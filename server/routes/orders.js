const router = require('express').Router()
const { placeOrder, myOrders, restaurantOrders, updateStatus, allOrders } = require('../controllers/orderController')
const { auth, role } = require('../middleware/auth')

router.post('/', auth, role('user'), placeOrder)
router.get('/my', auth, role('user'), myOrders)
router.get('/restaurant', auth, role('admin', 'superadmin'), restaurantOrders)
router.put('/:id/status', auth, role('admin', 'superadmin'), updateStatus)
router.get('/all', auth, role('superadmin'), allOrders)

module.exports = router
