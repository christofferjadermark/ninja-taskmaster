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
const client = new pg_1.Client({
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT || "5432", 10),
    user: process.env.PGUSER
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    console.log("Connected to PostgreSQL database");
    const result = yield client.query("SELECT * FROM cities");
    console.log("Query result:", result.rows[0].name);
    yield client.end();
    response.send("cities");
}));
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
    console.log('Webbtjänsten kan nu ta emot anrop.');
});
// const { rows } = await client.query('SELECT * FROM cities')
// console.log(rows)
