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
    // const test = await pool.query('SELECT * FROM activities WHERE user_id = $1');
    const query = 'SELECT * FROM activities WHERE user_id = $1';
    const values = [request.params.user_id];
    const result = yield pool.query(query, values);
    console.log(result.rows);
    response.send(result.rows);
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
    const { user_id, title, description, date } = request.body;
    console.log(user_id, title, description, date);
    try {
        const query = 'INSERT INTO activities (user_id, title, description, due_date, completed, repeat) VALUES ($1, $2, $3, $4, false, false)';
        const values = [user_id, title, description, date];
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
app.post('/api/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, dueDate } = req.body;
    try {
        const insertTaskQuery = 'INSERT INTO tasks (description, due_date) VALUES ($1, $2) RETURNING *';
        const result = yield pool.query(insertTaskQuery, [description, dueDate]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Failed to create task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// Get all tasks
app.get('/api/tasks', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllTasksQuery = 'SELECT * FROM tasks';
        const result = yield pool.query(getAllTasksQuery);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('Failed to retrieve tasks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// Get a single task by ID
app.get('/api/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getTaskByIdQuery = 'SELECT * FROM tasks WHERE id = $1';
        const result = yield pool.query(getTaskByIdQuery, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('Failed to retrieve task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// Update a task by ID
app.put('/api/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { description, dueDate } = req.body;
    try {
        const updateTaskQuery = 'UPDATE tasks SET description = $1, due_date = $2 WHERE id = $3';
        yield pool.query(updateTaskQuery, [description, dueDate, id]);
        res.sendStatus(200);
    }
    catch (error) {
        console.error('Failed to update task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// Delete a task by ID
app.delete('/api/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteTaskQuery = 'DELETE FROM tasks WHERE id = $1';
        yield pool.query(deleteTaskQuery, [id]);
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Failed to delete task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
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
        const test = yield pool.query('SELECT * FROM activities');
        console.log(test.rows);
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
    const { userName, email, password } = request.body;
    try {
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
        const values = [userName, email, password];
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
//   activity_id SERIAL PRIMARY KEY,
//   user_id INT NOT NULL,
//   title VARCHAR(255) NOT NULL,
//   description TEXT,
//   due_date DATE,
//   completed BOOLEAN DEFAULT FALSE,
//   repeat BOOLEAN DEFAULT FALSE,
//   FOREIGN KEY (user_id) REFERENCES users (user_id)
// );
