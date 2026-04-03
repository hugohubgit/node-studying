// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Hellooouuuu')
    
//     return response.end()

// })

// server.listen(3332)


import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body
    
    database.create({
        title: title,
        description: description,
        duration: duration,
    })

return reply.status(201).send()
})

server.get('/videos', () => {
    const videos = database.list()

    return videos
})

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

server.delete('/videos/:id', () =>{
    return 'Hello node.js'
})


server.listen({
    port: 3333,
}, (err, address) => {
    if (err) throw err
    console.log(`Server is listening at ${address}`)
})
