const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { gettoys, gettoyById, addtoy, updatetoy, removetoy, addReview } = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/',log, gettoys)
router.get('/:id', gettoyById)
router.post('/',requireAuth, requireAdmin, addtoy)
router.put('/:id',requireAuth, requireAdmin,updatetoy)
router.delete('/:id',requireAuth, requireAdmin,removetoy)

module.exports = router

