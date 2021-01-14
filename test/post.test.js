process.env.NODE_ENV = 'test'

const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')
const Posta = require('../src/model/posta')

const { posts } = require('./dummyPost')
const post1 = posts[0]
const post2 = posts[1]


beforeEach(async () => {
    await Posta.deleteMany()
    await Posta.create(post1)
    await Posta.create(post2)
})

describe('Tests Posta', () => {
    describe('Creates Posta', () => {
        test('it should throw an error if id already exist', async () => {
            const response = await request(app)
                .post('/v1/createPost')
                .send({
                    id: 997,
                    title: " test",
                    text: " first test",
                    country_id: "+2398",
                    language_id: 200
                })
                .expect(400)
            expect(response.body.message).toBe('id already exist please use another id')
        })

        test('it should throw an error if title is not provide on creating post', async () => {
            const res = await request(app)
                .post('/v1/createPost')
                .send({
                    id: 997,
                    text: " first test",
                    country_id: "+2398",
                    language_id: 200
                })
                .expect(400)
            expect(res.body.message).toBe(`all fields (id, title, text, country_id, language_id) is required`)
        })

        test('it should create a post successfully', async () => {
            const res = await request(app)
                .post('/v1/createPost')
                .send({
                    id: 673,
                    title: "test test",
                    text: " first test",
                    country_id: "+238",
                    language_id: 200
                })
                .expect(201)
            expect(res.body.message).toBe('posta data created successefully')
        })

    })


    describe('gets individual Post', () => {
        test('it should throw an error if id is invalid', async () => {
            const res = await request(app)
                .get(`/v1/getPost/${post1.id}`)
                .expect(400)
            expect(res.body.message).toBe('invalid Id')
        })

        test('it should get individual post when the id is passed', async () => {
            const res = await request(app)
                .get(`/v1/getPost/${post1._id}`)
                .expect(200)
            expect(res.body.message).toBe(`posta data gotten successefully`)
        })

        test('it should throw an error if id passed does not exist', async () => {
            let id = '5ec9665fd7730549c5bb4d0a'
            const res = await request(app)
                .get(`/v1/getPost/${id}`)
                .expect(400)
            expect(res.body.message).toBe(`id does not exist please pass a valid id`)
        })

    })


    describe('gets all Post', () => {
        test('it should get all post', async () => {
            const res = await request(app)
                .get(`/v1/getAllPost`)
                .expect(200)
            expect(res.body.message).toBe('All posts retrieved successfully')
        })

    })


    describe('updates individual Post', () => {
        test('it should update where the data to update is passed', async () => {
            const res = await request(app)
                .put(`/v1/updatePost/${post2._id}`)
                .send({
                    title: 'new update'
                })
                .expect(200)
            expect(res.body.message).toBe('post updated successfully')
        })

        test('it should throw an error if a valid mongoose id is not passed', async () => {
            const res = await request(app)
                .put(`/v1/updatePost/${9839}`)
                .send({
                    title: 'new update'
                })
                .expect(400)
            expect(res.body.message).toBe('invalid Id')
        })

        test('it should throw an error if no object to update is passed in the body', async () => {
            const res = await request(app)
                .put(`/v1/updatePost/${post1._id}`)
                .send({
                })
                .expect(400)
            expect(res.body.message).toBe('request body cannot be empty')
        })
        test('it should throw an error if id passed does not exist', async () => {
            let id = '5ec9665fd7730549c5bb4d0a'
            const res = await request(app)
                .put(`/v1/updatePost/${id}`)
                .expect(400)
            expect(res.body.message).toBe(`id does not exist please pass a valid id`)
        })

    })


    describe('deletes individual Post', () => {
        test('it should delete post where the id of the post to delete is passed', async () => {
            const res = await request(app)
                .delete(`/v1/deletePost/${post2._id}`)
                .expect(200)
            expect(res.body.message).toBe('post deleted successfully')
        })

        test('it should throw an error if a valid mongoose id is not passed', async () => {
            const res = await request(app)
                .delete(`/v1/deletePost/${9839}`)
                .expect(400)
            expect(res.body.message).toBe('invalid Id')
        })

        test('it should throw an error if id passed does not exist', async () => {
            let id = '5ec9665fd7730549c5bb4d0a'
            const res = await request(app)
                .delete(`/v1/deletePost/${id}`)
                .expect(400)
            expect(res.body.message).toBe(`id does not exist please pass a valid id`)
        })
    })
})