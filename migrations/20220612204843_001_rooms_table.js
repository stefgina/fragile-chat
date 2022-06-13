/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`CREATE TABLE rooms (
                    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(30) NOT NULL,
                    password VARCHAR(30) NOT NULL,
                    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw("DROP TABLE rooms")
};
