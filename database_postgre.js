
import { randomUUID } from "crypto";
import { sql } from "./db.js"

export class DatabasePostgre{
  #videos = new Map();

  async list(search){
    let videos 

    if (search) {
      return await sql ` SELECT * FROM videos WHERE title LIKE ${"%" + search + "%"}`
    }
      return await sql ` SELECT * FROM videos`
  }

  async create(video){
    const videoid = randomUUID();

    const {title, description, duration} = video

    await sql ` INSERT INTO videos (id, title, description, duration) VALUES (${videoid}, ${title}, ${description}, ${duration})`
  }

  async update(id, video){

    const {title, description, duration} = video

    await sql ` UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`

                                                                    
  }

  async delete(id){

    await sql ` DELETE FROM videos WHERE id = ${id}`
    
  }
}
