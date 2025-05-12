module.exports = {
  createUser: `
    INSERT INTO users (username, email, password) 
    VALUES ($1, $2, $3) 
    RETURNING id, username, email, created_at
  `,
  findUserByUsername: `
    SELECT * FROM users 
    WHERE username = $1
  `,
  findUserById: `
    SELECT id, username, email, created_at 
    FROM users 
    WHERE id = $1
  `,
  checkUserExists: `
    SELECT EXISTS(
      SELECT 1 FROM users 
      WHERE username = $1 OR email = $2
    )
  `,
  createTable: `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  updatePassword: `
    UPDATE users 
    SET password = $1 
    WHERE id = $2 
    RETURNING id, username, email, created_at
  `,
  findUserByEmail: `
    SELECT * FROM users 
    WHERE email = $1
  `,
  deleteUser: `
    DELETE FROM users 
    WHERE id = $1 
    RETURNING id, username, email
  `,
  
};