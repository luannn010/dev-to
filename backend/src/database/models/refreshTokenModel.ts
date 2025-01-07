import db from "../dbConfig";

export const storeRefreshToken = (token: string, userId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?)";
    db.run(query, [token, userId], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

export const deleteRefreshToken = (token: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM refresh_tokens WHERE token = ?";
    db.run(query, [token], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

export const findRefreshToken = (token: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const query = "SELECT 1 FROM refresh_tokens WHERE token = ?";
    db.get(query, [token], (err, row) => {
      if (err) return reject(err);
      resolve(!!row);
    });
  });
};
