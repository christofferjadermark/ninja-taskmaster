import dotenv from "dotenv";
import { Client } from "pg";
import cors from 'cors'
import express from 'express'
dotenv.config()

const client = new Client({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT || "5432", 10),
  user: process.env.PGUSER
})
const app = express()
app.use(cors())
app.get('/', async (request, response) => {
  await client.connect();
      console.log("Connected to PostgreSQL database");
  const result = await client.query("SELECT * FROM cities");
  console.log("Query result:", result.rows[0].name);
  await client.end();
  response.send("cities")
})

// client.connect()


// async function connectAndQuery() {
//   try {
//     await client.connect();
//     console.log("Connected to PostgreSQL database");


//     const result = await client.query("SELECT * FROM cities");
//     console.log("Query result:", result.rows);

//     await client.end();
//     console.log("Connection to PostgreSQL database closed");
//   } catch (error) {
//     console.error("Error connecting to PostgreSQL database:", error);
//   }
// }
app.listen(8080, () => {
  console.log('Webbtjänsten kan nu ta emot anrop.')
})
// const { rows } = await client.query('SELECT * FROM cities')
// console.log(rows)
