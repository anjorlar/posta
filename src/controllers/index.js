
const mongoose = require('mongoose');
const responseHelper = require('../libs/response')
const pagination = require('../libs/pagination');
const postaServices = require('../services/index');
const getCurrentTime = require('../utils/getDate');


class PostaController {
    /**
    * @description Creates posta data when the required data is passed in the body
    * @param {Object} req  req - Http Request object
    * @param {Object} res  res - Http Response object
    * @returns {Object} returns object of the required response
    */

    async createPost(req, res) {
        try {
            let { id, title, text, country_id, language_id } = req.body
            const date = getCurrentTime()
            //checks if the required data is passed
            if (!id || !title || !text || !country_id || !language_id) {
                return res.status(400)
                    .send(responseHelper.error(400, `all fields (id, title, text, country_id, language_id) is required`))
            }
            const idExists = await postaServices.getIdOfPost(id)
            if (idExists) {
                return res.status(400)
                    .send(responseHelper.error(400, `id already exist please use another id`))
            }
            const data = {
                id, title, text, date, country_id, language_id,
            }
            const postaData = await postaServices.createPostaData(data)
            return res.status(201)
                .send(responseHelper.success(201, `posta data created successefully`, postaData))
        } catch (error) {
            console.log('internal server error', error)
            return res.status(500)
                .send(responseHelper.error(500, `internal server error, ${error}`))
        }

    }

    /**
     * @description gets only the posta data of the id passed as a param
     * @param {*} req req - Http Request object
     * @param {*} res res - Http Response object
     * @returns {Object} returns object of the required response
     */
    async getPostById(req, res) {
        try {
            let { id } = req.params
            if (!id) {
                return res.status(400)
                    .send(responseHelper.error(400, `id is required`))
            }
            const isValid = mongoose.Types.ObjectId.isValid(id)
            if (!isValid) {
                return res.status(400).send(responseHelper.error(400, 'invalid Id'))
            }
            const idExists = await postaServices.getId(id)
            if (!idExists) {
                return res.status(400)
                    .send(responseHelper.error(400, `id does not exist please pass a valid id`))
            }
            const getIndividualPost = await postaServices.getId(id)
            return res.status(200)
                .send(responseHelper.output(200, `posta data gotten successefully`, getIndividualPost))
        } catch (error) {
            console.log('internal server error', error)
            return res.status(500)
                .send(responseHelper.error(500, `internal server error, ${error}`))
        }
    }

    /**
     * @description gets all the posta data and paginates them
     * @param {*} req req - Http Request object
     * @param {*} res res - Http Response object
     * @returns {Object} returns object of the required response
     */
    async getAllPost(req, res) {
        try {
            let { limit, page } = req.query
            limit = parseInt(limit)
            page = parseInt(page)
            if (!limit || !page) {
                limit = 10,
                    page = 0
            }
            const posts = await postaServices.getAllPost(limit, page)
            const count = posts.length
            const paginate = {
                limit, page
            }
            return res.status(200)
                .send(responseHelper.success(200, 'All posts retrieved successfully', posts, pagination(count, paginate)))
        } catch (error) {
            console.log('internal server error', error)
            return res.status(500)
                .send(responseHelper.error(500, `internal server error, ${error}`))
        }
    }

    /**
     * @description updates a posta data when the id and content to update is passed
     * @param {*} req req - Http Request object
     * @param {*} res res - Http Response object
     * @returns {Object} returns object of the required response
     */
    async updatesPost(req, res) {
        try {
            let { id } = req.params
            const data = req.body
            if (!id) {
                return res.status(400)
                    .send(responseHelper.error(400, `id is required`))
            }
            const isValid = mongoose.Types.ObjectId.isValid(id)
            if (!isValid) {
                return res.status(400).send(responseHelper.error(400, 'invalid Id'))
            }
            const idExists = await postaServices.getId(id)
            if (!idExists) {
                return res.status(400)
                    .send(responseHelper.error(400, `id does not exist please pass a valid id`))
            }
            if (Object.keys(data).length === 0 && data.constructor === Object) {
                return res.status(400)
                    .send(responseHelper.error(400, `request body cannot be empty`))
            }
            const requiredValues = Object.keys(data)
            const allowedFields = ['title', 'text', 'country_id', 'language_id']
            //validate input fields
            const allowedUpdate = requiredValues.every(value =>
                allowedFields.includes(value))
            if (!allowedUpdate) {
                return res.status(400)
                    .send(responseHelper.error(400, `invalid request body`))
            }
            const post = await postaServices.getId(id)
            if (!post) {
                return res.status(400)
                    .send(responseHelper.error(400, `post does not exist`))
            }
            const updated = await postaServices.updateById(id, data)
            return res.status(200)
                .send(responseHelper.output(200, 'post updated successfully', updated))
        } catch (error) {
            console.log('internal server error', error)
            return res.status(500)
                .send(responseHelper.error(500, `internal server error, ${error}`))
        }
    }



    /**
     * @description deletes a posta data when the id is passed
     * @param {*} req req - Http Request object
     * @param {*} res res - Http Response object
     * @returns {Object} returns object of the required response
     */
    async deletesPost(req, res) {
        try {
            let { id } = req.params
            if (!id) {
                return res.status(400)
                    .send(responseHelper.error(400, `id is required`))
            }
            const isValid = mongoose.Types.ObjectId.isValid(id)
            if (!isValid) {
                return res.status(400).send(responseHelper.error(400, 'invalid Id'))
            }
            const idExists = await postaServices.getId(id)
            if (!idExists) {
                return res.status(400)
                    .send(responseHelper.error(400, `id does not exist please pass a valid id`))
            }
            const postDelete = await postaServices.deleteIndividualPost(id)
            return res.status(200)
                .send(responseHelper.output(200, 'post deleted successfully', postDelete))
        } catch (error) {
            console.log('internal server error', error)
            return res.status(500)
                .send(responseHelper.error(500, `internal server error, ${error}`))
        }
    }
}

module.exports = new PostaController()