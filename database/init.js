const connection = require('../config/db')
const createTables = async () => {
    try {
        await connection.promise().query(`
            CREATE TABLE IF NOT EXISTS departments(
                department_id INT AUTO_INCREMENT PRIMARY KEY,
                department_name VARCHAR(255)
            )
        `);

        await connection.promise().query(`
            CREATE TABLE IF NOT EXISTS students(
                student_id INT AUTO_INCREMENT PRIMARY KEY,
                student_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE,
                department_id INT,
                FOREIGN KEY(department_id)
                REFERENCES departments(department_id)
            )
        `);

        await connection.promise().query(`
            CREATE TABLE IF NOT EXISTS users(
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin','user') DEFAULT 'user'
            )
        `);

        console.log("All tables created successfully");

    } catch (err) {
        console.log(err);
    }
};

module.exports = createTables;