import db from "../dbConfig";

export const createUsersTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `,
      (err) => {
        if (err) {
          console.error("Error creating users table:", err.message);
          reject(err);
        } else {
          console.log("Users table created or already exists.");
          resolve();
        }
      }
    );
  });
};
