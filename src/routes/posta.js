const express = require('express')
const router = express.Router()
const postaController = require('../controllers/index')


router.post('/create-post', postaController.createPost)
router.get('/get-post/:id', postaController.getPostById)
router.get('/get-all-post', postaController.getAllPost)
router.put('/update-post/:id', postaController.updatesPost)
router.delete('/delete-post/:id', postaController.deletesPost)
module.exports = router