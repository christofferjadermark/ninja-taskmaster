"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const pool = new pg_1.Client({
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT || '5432', 10),
    user: process.env.PGUSER,
});
pool.connect();
app.get('/:user_id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
      SELECT activities.*, users.*
      FROM activities
      JOIN users ON activities.user_id = users.user_id
      WHERE activities.user_id = $1
    `;
        const { user_id } = request.params;
        const result = yield pool.query(query, [user_id]);
        const rows = result.rows;
        console.log(rows);
        response.json(rows);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        response.status(500).send('An error occurred while fetching data');
    }
}));
app.delete('/delete/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const activity_id = request.params.id;
    try {
        const query = 'DELETE FROM activities WHERE activity_id = $1';
        const values = [activity_id];
        yield pool.query(query, values);
        response.status(200).json({ message: 'Objektet har tagits bort' });
    }
    catch (error) {
        console.error('Fel vid borttagning av objektet:', error);
        response
            .status(500)
            .json({ message: 'Ett fel uppstod vid borttagning av objektet' });
    }
}));
app.post('/add', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, title, description, date, category, allDay, priority } = request.body;
    console.log(user_id, title, description, date, category, allDay, priority);
    try {
        const query = 'INSERT INTO activities (user_id, title, description, due_date, completed, repeat, category, all_day, priority) VALUES ($1, $2, $3, $4, false, false, $5, $6, $7)';
        const values = [
            user_id,
            title,
            description,
            date,
            category,
            allDay,
            priority,
        ];
        yield pool
            .query(query, values)
            .then(() => {
            response.status(201).send('Aktivitet Tillagd!');
        })
            .catch((error) => {
            console.error('Fel vid skapande av konto:', error);
            response.status(500).send('Ett fel uppstod vid skapandet av kontot.');
        });
    }
    catch (error) {
        console.error('Fel vid anslutning:', error);
        response.status(500).send('Ett fel uppstod vid anslutning till databasen.');
    }
}));
// Add a new task
app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, title, description, date, category, allDay, priority } = req.body;
    try {
        const insertTaskQuery = 'INSERT INTO tasks (user_id, title, description, date, category, allDay, priority) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const result = yield pool.query(insertTaskQuery, [user_id, title, description, date, category, allDay, priority]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Ett fel uppstod vid skapandet av en aktivitet:', error);
        res.status(500).json({ message: 'Fel vid anslutning' });
    }
}));
// Get all tasks
app.get('/tasks', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllTasksQuery = 'SELECT * FROM tasks';
        const result = yield pool.query(getAllTasksQuery);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('Ett fel uppstod vid försök att hämta alla aktiviteter:', error);
        res.status(500).json({ message: 'Fel vid anslutning' });
    }
}));
// Get a single task by ID
app.get('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getTaskByIdQuery = 'SELECT * FROM tasks WHERE id = $1';
        const result = yield pool.query(getTaskByIdQuery, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Ett fel uppstod vid letandet för din aktivitet' });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('Ett fel uppstod vid försök av att hitta din aktivitet:', error);
        res.status(500).json({ message: 'Fel vid anslutning' });
    }
}));
// Update a task by ID
app.put('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user_id, title, description, date, category, allDay, priority } = req.body;
    try {
        const updateTaskQuery = 'UPDATE tasks SET user_id = $1, title = $2, description = $3, date = $4, category = $5, allDay = $6, priority = $7 WHERE id = $8';
        yield pool.query(updateTaskQuery, [user_id, title, description, date, category, allDay, priority, id]);
        res.sendStatus(200);
    }
    catch (error) {
        console.error('Ett fel uppstod vid försök att uppdatera din aktivitet:', error);
        res.status(500).json({ message: 'Fel vid anslutning' });
    }
}));
// Delete a task by ID
app.delete('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteTaskQuery = 'DELETE FROM tasks WHERE id = $1';
        yield pool.query(deleteTaskQuery, [id]);
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Ett fel uppstod vid försök att radera din aktivitet:', error);
        res.status(500).json({ message: 'Fel vid anslutning' });
    }
}));
// Christoffers kod för att uppdatera aktivitet, fungerar inte än
// app.patch('/update', async (request, response) => {
//   const { activity_id, title, description, date } = request.body;
//   console.log(activity_id, title, description, date);
//   const user = 'SELECT * FROM users WHERE user_id = $1'
//   try {
//     const query =
//       'UPDATE activities SET title = $1, description = $2, due_date = $3 WHERE activity_id = $4';
//     const values = [title, description, date, activity_id];
//     await pool
//       .query(query, values)
//       .then(() => {
//         response.status(201).send('Aktivitet Uppdaterad!');
//       })
//       .catch((error: Error) => {
//         console.error('Fel vid skapande av konto:', error);
//         response
//           .status(500)
//           .send('Ett fel uppstod vid uppdatering av aktiviteten.');
//       });
//   } catch (error) {
//     console.error('Fel vid anslutning:', error);
//     response.status(500).send('Ett fel uppstod vid anslutning till databasen.');
//   }
// });
app.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    console.log(request.body + 'body');
    console.log(email, password + 'jjj');
    try {
        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const values = [email, password];
        const result = yield pool.query(query, values);
        // const test = await pool.query('SELECT * FROM activities');
        // console.log(test.rows);
        console.log(JSON.stringify(result.rows) + 'Rows');
        if (result.rows.length > 0) {
            console.log(result.rows.length);
            response.json(result.rows);
        }
        else {
            response.status(401).json({ message: 'Ogiltiga inloggningsuppgifter.' });
        }
    }
    catch (error) {
        console.error('Fel vid anslutning:', error);
        response.status(500).send('Ett fel uppstod vid anslutning till databasen.');
    }
}));
const parseUrlEncodedMiddleware = express_1.default.urlencoded({ extended: false });
app.post('/create', parseUrlEncodedMiddleware, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password, phoneNumber } = request.body;
    console.log(userName, email, password);
    try {
        const query = 'INSERT INTO users (username, email, password, phonenumber) VALUES ($1, $2, $3, $4)';
        const values = [userName, email, password, phoneNumber];
        console.log(userName + '53 ');
        yield pool
            .query(query, values)
            .then(() => {
            response.status(201).send('Konto skapat!');
        })
            .catch((error) => {
            console.error('Fel vid skapande av konto:', error);
            response.status(500).send('Ett fel uppstod vid skapandet av kontot.');
        });
    }
    catch (error) {
        console.error('Fel vid anslutning:', error);
        response.status(500).send('Ett fel uppstod vid anslutning till databasen.');
    }
}));
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
// activity_id SERIAL PRIMARY KEY,
// user_id INT NOT NULL,
// title VARCHAR(255) NOT NULL,
// description TEXT,
// due_date DATE,
// completed BOOLEAN DEFAULT FALSE,
// repeat BOOLEAN DEFAULT FALSE,
// FOREIGN KEY (user_id) REFERENCES users (user_id)
// );
