import { randomUUID } from "node:crypto"

export class DatabaseMemory {
 #videos = new Map()

list(search) {
    
    return Array.from(this.#videos.entries())
        .map((videoArray) => {
            
            // Organizes Array including id + data
            const id = videoArray[0]
            const data = videoArray[1]

            return {
                id: id, 
                ...data,
            }
    })

    // Filter search
    .filter(video => {
        if (search) {
            return video.title.includes(search)
        }

        return true
    })
}

// POST
 create(video) {
    const videoId = randomUUID()

    this.#videos.set(videoId, video)
 }
// PUT
 update(id, video) {
    this.#videos.set(id, video)
 }

 //DELETE
 delete(id, video) {
    this.#videos.delete(id)
}
}