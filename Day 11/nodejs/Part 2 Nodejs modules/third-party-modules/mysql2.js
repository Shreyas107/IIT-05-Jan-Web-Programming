const mysql = require("mysql2/promise");

// Create a connection to the database
async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shreyas",
    database: "july",
  });

  console.log("Connected to the MySQL server.");

  // Create a table
  await connection.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
        );
    `);

  console.log("Table created.");

  // Insert a user
  const [result] = await connection.execute(
    `
        INSERT INTO users (name, email) VALUES (?, ?)
    `,
    ["John Doe", "john.doe@example.com"]
  );

  console.log("User inserted with ID:", result.insertId);

  // Query the users
  const [rows] = await connection.execute("SELECT * FROM users");
  console.log("Users:", rows);

  // Close the connection
  await connection.end();
  console.log("Connection closed.");
}

main().catch(console.error);
