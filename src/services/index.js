const postaModel = require('../model/posta');


class PostaServices {
    getId(id) {
        return postaModel.findOne({ _id: id }).exec()
    }

    getIdOfPost(id) {
        return postaModel.findOne({ id: id }).exec()
    }

    createPostaData(data) {
        return postaModel.create(data)
    }
    getAllPost(limit, page) {
        return postaModel.find()
            .limit(limit)
            .skip(page)
            .sort({ title: 'asc' })
            .exec()
    }

    updateById(id, data) {
        return postaModel.findOneAndUpdate(id, data, {
            new: true,
            runValidators: true
        }).lean()
            .exec()
    }

    deleteIndividualPost(id) {
        return postaModel.findOneAndDelete(id)
            .exec()
    }
}

module.exports = new PostaServices()