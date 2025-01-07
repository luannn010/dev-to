// dbConfig.ts
// Initialize SQLite database
import sqlite3 from "sqlite3";
import path from "path";
import { initializeTables } from "./migrations";
const dbPath = path.resolve(__dirname, "app.db"); // Updated to use "app.db" as the database name

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    initializeTables(); // Initialize tables on database connection
  }
});


export default db;
