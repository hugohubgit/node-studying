// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Hellooouuuu')
    
//     return response.end()

// })

// server.listen(3332)


import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'
import { request } from 'node:http'

const server = fastify()

const database = new DatabaseMemory()

// POST
server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body
    
    database.create({ 
        title: title,
        description: description,
        duration: duration,
    })

return reply.status(201).send()
})

// GET
server.get('/videos', (request) => {
    const search = request.query.search


    const videos = database.list(search)

    return videos
})

// PUT
server.put('/videos/:id', (request, reply) =>{
    const videoId = request.params.id
    const { title, description, duration } = request.body

    database.update(videoId, {
        title: title,
        description: description,
        duration: duration,
    })
    
    return reply.status(204).send()
})

// DELETE
server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})


server.listen({
    port: 3333,
}, (err, address) => {
    if (err) throw err
    console.log(`Server is listening at ${address}`)
})
