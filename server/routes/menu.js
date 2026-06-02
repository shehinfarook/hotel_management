const router = require('express').Router()
const { getMenu, addItem, updateItem, deleteItem } = require('../controllers/menuController')
const { auth, role } = require('../middleware/auth')

router.get('/', getMenu)
router.post('/', auth, role('admin', 'superadmin'), addItem)
router.put('/:id', auth, role('admin', 'superadmin'), updateItem)
router.delete('/:id', auth, role('admin', 'superadmin'), deleteItem)

module.exports = router
