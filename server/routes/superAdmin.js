const router = require('express').Router()
const { getAll, create, update, remove, assignAdmin, getAllUsers } = require('../controllers/superAdminController')
const { auth, role } = require('../middleware/auth')

router.use(auth, role('superadmin'))

router.get('/restaurants', getAll)
router.post('/restaurants', create)
router.put('/restaurants/:id', update)
router.delete('/restaurants/:id', remove)
router.post('/assign-admin', assignAdmin)
router.get('/users', getAllUsers)

module.exports = router
