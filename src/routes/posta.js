const express = require('express')
const router = express.Router()
const postaController = require('../controllers/index')


router.post('/createPost', postaController.createPost)
router.get('/getPost/:id', postaController.getPostById)
router.get('/getAllPost', postaController.getAllPost)
router.put('/updatePost/:id', postaController.updatesPost)
router.delete('/deletePost/:id', postaController.deletesPost)
module.exports = router