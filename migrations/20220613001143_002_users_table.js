/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    await knex.raw(`CREATE TABLE users (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        password VARCHAR(30) NOT NULL,
        email VARCHAR(30) NOT NULL,
        room_id int NOT NULL,
        ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (room_id) REFERENCES rooms(id))`)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    await knex.raw("DROP TABLE users")
};
