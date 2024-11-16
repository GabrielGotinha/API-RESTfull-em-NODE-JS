import 'dotenv/config';
import postgres from 'postgres';
import http from 'http';
import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL);

// Se você quiser exportar o `sql`

// const requestHandler = async (req, res) => {
//   const result = await sql`SELECT version()`;
//   const { version } = result[0];
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end(version);
// };

// http.createServer(requestHandler).listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });