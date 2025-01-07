import db from "../dbConfig";
import { User } from "../types/Users";

export const createUser = (username: string, password: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users (username, password) VALUES (?, ?)";
      db.run(query, [username, password], function (err) {
        if (err) return reject(err);
        resolve(this.lastID); // TypeScript recognizes this.lastID as number
      });
    });
  };
  
export const findUserByUsername = (username: string): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE username = ?";
      
      // Explicitly type row as User | undefined
      db.get(query, [username], (err, row: User | undefined) => {
        if (err) return reject(err);
  
        if (row) {
          // Ensure the row matches the User type
          const user: User = {
            id: row.id,
            username: row.username,
            password: row.password,
          };
          resolve(user);
        } else {
          resolve(null); // No user found
        }
      });
    });
  };