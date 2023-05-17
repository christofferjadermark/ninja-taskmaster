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
app.use(express_1.default.urlencoded({ extended: false }));
app.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    const pool = new pg_1.Client({
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        password: process.env.PGPASSWORD,
        port: parseInt(process.env.PGPORT || "5432", 10),
        user: process.env.PGUSER
    });
    try {
        yield pool.connect();
        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const values = [username, password];
        const result = yield pool.query(query, values);
        console.log(result.rows);
        if (result.rows.length > 0) {
            response.status(200).json({ message: 'Inloggning lyckades!' });
        }
        else {
            response.status(401).json({ message: 'Ogiltiga inloggningsuppgifter.' });
        }
    }
    catch (error) {
        console.error('Fel vid anslutning:', error);
        response.status(500).send('Ett fel uppstod vid anslutning till databasen.');
    }
    finally {
        pool.end();
    }
}));
app.post('/create', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = new pg_1.Client({
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        password: process.env.PGPASSWORD,
        port: parseInt(process.env.PGPORT || "5432", 10),
        user: process.env.PGUSER
    });
    try {
        yield pool.connect();
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
        const values = [request.body.userName, request.body.email, request.body.password];
        yield pool.query(query, values)
            .then(() => {
            pool.end();
            response.send('Konto skapat!');
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
