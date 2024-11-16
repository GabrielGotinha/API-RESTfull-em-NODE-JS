import { fastify } from "fastify";
// import { DatabaseMemory } from "./database.js";
import { DatabasePostgre } from "./database_postgre.js";

const server = fastify();

// const database = new DatabaseMemory();
const database = new DatabasePostgre();

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", async (request) => {
  const search = request.query.search || null;

  if (!search) {
    console.log("nao tem search");
  }

  const videos = await database.list(search);

  return videos;
});

server.put("/videos/:id", async (request, reply) => {
  const videoid = request.params.id;

  const { title, description, duration } = request.body;

  await database.update(videoid, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", (request, reply) => {
  const videoid = request.params.id;

  database.delete(videoid);

  return reply.status(204).send();
});


server.listen({
  port: 3000,
  host: '0.0.0.0'
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor escutando em ${address}`);
});

