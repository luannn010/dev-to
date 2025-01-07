import db from "../dbConfig";

export const createRefreshTokensTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `,
      (err) => {
        if (err) {
          console.error("Error creating refresh tokens table:", err.message);
          reject(err);
        } else {
          console.log("Refresh tokens table created or already exists.");
          resolve();
        }
      }
    );
  });
};
