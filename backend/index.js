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
const webpush = require('web-push');
const crypto = require('crypto');
const path = require('path');
const keys = {
    publicKey: 'BAti49YH8sN8PIsN30BLyPQYXU85RdtkJ1ITaApHBmezvqCxmCFI0xtDquo9cWMfaGP2V2vDSovrICxJzmN7Gd0',
    privateKey: 'Eda5AdccGizAySb3EKP2f5Xzo4ovQu9Pn6LI9mA0vW0',
};
webpush.setVapidDetails('mailto:example@yourdomain.org', keys.publicKey, keys.privateKey);
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const pool = new pg_1.Client({
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT || '5432', 10),
    user: process.env.PGUSER,
});
const adjustDateToGMTPlus2 = (date) => {
    const gmtPlus2Offset = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const adjustedDate = new Date(date.getTime() + gmtPlus2Offset);
    return adjustedDate;
};
pool.connect();
const updateOverdueTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date().toISOString();
        const query = `
      UPDATE activities
      SET completed = true
      WHERE due_date < $1 AND completed = false
    `;
        yield pool.query(query, [currentDate]);
    }
    catch (error) {
        console.error('Error updating overdue tasks:', error);
    }
});
const updateOverdueTasksWithOffset = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = adjustDateToGMTPlus2(new Date()).toISOString();
        const query = `
      UPDATE activities
      SET completed = true
      WHERE due_date < $1 AND completed = false
    `;
        yield pool.query(query, [currentDate]);
    }
    catch (error) {
        console.error('Error updating overdue tasks:', error);
    }
});
// GET
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
        if (rows.length === 0) {
            const query2 = `
      SELECT * FROM users WHERE user_id = $1
    `;
            const result2 = yield pool.query(query2, [user_id]);
            const rows2 = result2.rows;
            console.log(rows2);
            response.json(rows2);
        }
        else {
            console.log(rows);
            response.json(rows);
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
        response.status(500).send('An error occurred while fetching data');
    }
}));
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
app.get('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getTaskByIdQuery = 'SELECT * FROM activities WHERE activity_id = $1';
        const result = yield pool.query(getTaskByIdQuery, [id]);
        if (result.rows.length === 0) {
            return res
                .status(404)
                .json({ message: 'Ett fel uppstod vid letandet för din aktivitet' });
        }
        console.log(result.rows[0]);
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('Ett fel uppstod vid försök av att hitta din aktivitet:', error);
        res.status(500).json({ message: 'Fel vid anslutning' });
    }
}));
// POSTS
app.post('/changeAccount', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, username, email, password, phoneNumber } = request.body;
    console.log(user_id, username, email, password, phoneNumber);
    try {
        const query = 'UPDATE users SET username = $1, email = $2, password = $3, phonenumber = $4 WHERE user_id = $5';
        const values = [username, email, password, phoneNumber, user_id];
        yield pool
            .query(query, values)
            .then(() => {
            response.status(200).send('Konto uppdaterat!');
            console.log('Konto uppdaterat!');
        })
            .catch((error) => {
            console.error('Fel vid uppdatering av konto:', error);
            response.status(500).send('Ett fel uppstod vid uppdatering av kontot.');
        });
    }
    catch (error) {
        console.error('Fel vid anslutning:', error);
        response.status(500).send('Ett fel uppstod vid anslutning till databasen.');
    }
}));
app.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    console.log(request.body + 'body');
    console.log(email, password + 'jjj');
    try {
        const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
        const values = [email, password];
        const result = yield pool.query(query, values);
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
app.post('/create', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password, phoneNumber } = request.body;
    console.log(userName);
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
app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, title, description, date, category, allDay, priority } = req.body;
    try {
        const insertTaskQuery = 'INSERT INTO tasks (user_id, title, description, date, category, allDay, priority) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const result = yield pool.query(insertTaskQuery, [
            user_id,
            title,
            description,
            date,
            category,
            allDay,
            priority,
        ]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Ett fel uppstod vid skapandet av en aktivitet:', error);
        res.status(500).json({ message: 'Fel vid anslutning' });
    }
}));
// PUTS
// Get a single task by ID
app.get('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getTaskByIdQuery = 'SELECT * FROM activities WHERE activity_id = $1';
        const result = yield pool.query(getTaskByIdQuery, [id]);
        if (result.rows.length === 0) {
            return res
                .status(404)
                .json({ message: 'Ett fel uppstod vid letandet för din aktivitet' });
        }
        result.rows[0].due_date.setHours(result.rows[0].due_date.getHours() + 0);
        console.log(result.rows[0].due_date);
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
    console.log('Funkar');
    try {
        const updateTaskQuery = 'UPDATE activities SET user_id = $1, title = $2, description = $3, due_date = $4, category = $5, all_day = $6, priority = $7 WHERE activity_id = $8';
        yield pool.query(updateTaskQuery, [
            user_id,
            title,
            description,
            date,
            category,
            allDay,
            priority,
            id,
        ]);
        res.sendStatus(200);
    }
    catch (error) {
        console.error('Ett fel uppstod vid försök att uppdatera din aktivitet:', error);
        res.status(500).json({ message: 'Fel vid anslutning' });
    }
}));
// DELETES
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
const subscriptions = {};
console.log(subscriptions);
app.get('/subscription/:id', (request, response) => {
    console.log('helo');
    console.log(request.body);
    sendPushNotification(request.body, response);
});
app.post('/subscription', (request, response) => {
    handlePushNotificationSubscription(request, response);
});
function createHash(input) {
    const md5sum = crypto.createHash('md5');
    md5sum.update(Buffer.from(input));
    return md5sum.digest('hex');
}
function handlePushNotificationSubscription(req, res) {
    const subscriptionRequest = req.body;
    console.log('Hello');
    console.log(subscriptionRequest);
    const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
    console.log('Hejsan3');
    subscriptions[susbscriptionId] = subscriptionRequest;
    console.log(subscriptions);
    res.status(201).json({ id: susbscriptionId });
}
function sendPushNotification(req, res) {
    const subscriptionId = req.params.id;
    console.log(subscriptionId);
    const pushSubscription = subscriptions[subscriptionId];
    console.log(pushSubscription);
    console.log(subscriptions);
    webpush
        .sendNotification(pushSubscription, JSON.stringify({
        title: 'Push Notification',
        text: 'This is a push notification',
    }))
        .catch((error) => {
        console.log(error);
    });
}
app.use(express_1.default.static(path.join(path.resolve(), '../public')));
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
