/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`CREATE TABLE users (
                    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(30) NOT NULL,
                    password VARCHAR(30) NOT NULL,
                    email VARCHAR(30) NOT NULL )`)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw("DROP TABLE users")
};
