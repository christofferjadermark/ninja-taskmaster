import dotenv from 'dotenv';
import { Client } from 'pg';
import cors from 'cors';
import express from 'express';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Client({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT || '5432', 10),
  user: process.env.PGUSER,
});

pool.connect();

app.post('/login', async (request, response) => {
  const { email, password } = request.body;
  console.log(request.body + 'body');

  console.log(email, password + 'jjj');
  try {
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values = [email, password];
    const result = await pool.query(query, values);
    console.log(JSON.stringify(result.rows) + 'Rows');
    if (result.rows.length > 0) {
      console.log(result.rows.length);
      // localStorage.setItem('isLoggedIn', 'true');
      response.json(result.rows);
    } else {
      // localStorage.setItem('isLoggedIn', 'false');
      response.status(401).json({ message: 'Ogiltiga inloggningsuppgifter.' });
    }
  } catch (error) {
    console.error('Fel vid anslutning:', error);
    response.status(500).send('Ett fel uppstod vid anslutning till databasen.');
  }
});
app.post('/create', async (request, response) => {
  try {
    const query =
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
    const values = [
      request.body.userName,
      request.body.email,
      request.body.password,
    ];

    console.log(values + '53 ');

    await pool
      .query(query, values)
      .then(() => {
        response.status(201).send('Konto skapat!');
      })
      .catch((error: Error) => {
        console.error('Fel vid skapande av konto:', error);
        response.status(500).send('Ett fel uppstod vid skapandet av kontot.');
      });
  } catch (error) {
    console.error('Fel vid anslutning:', error);
    response.status(500).send('Ett fel uppstod vid anslutning till databasen.');
  }
});

// });
app.listen(8080, () => {
  console.log('Webbtjänsten kan nu ta emot anrop.');
});

// CREATE TABLE users (
//   user_id SERIAL PRIMARY KEY,
//   username VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   password VARCHAR(255) NOT NULL
// );

// CREATE TABLE activities (
//   activity_id SERIAL PRIMARY KEY,
//   user_id INT NOT NULL,
//   title VARCHAR(255) NOT NULL,
//   description TEXT,
//   due_date DATE,
//   completed BOOLEAN DEFAULT FALSE,
//   repeat BOOLEAN DEFAULT FALSE,
//   FOREIGN KEY (user_id) REFERENCES users (user_id)
// );
