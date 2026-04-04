import { randomUUID } from "node:crypto"
import { sql } from './src/app.js'

export class DatabasePostgres {
 


 // GET
async list(search) {
    let videos
    
    if (search) {
        videos = await sql`select * from videos where title ilike ${'%' + search + '%' }`
    }
    else {
        videos = await sql`select * from videos`
    }
    return videos
}

// POST
async create(video) {
    const videoId = randomUUID()

    const { title, description, duration } = video
    
    await sql `insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
 }
// PUT
async update(id, video) {
    const { title, description, duration } = video

    await sql `update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
 }

 //DELETE
async delete(id, video) {
    await sql`delete from videos where id = ${ id }`
}
}