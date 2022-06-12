// Update with your config settings.
const cnf = require('./config')
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: cnf.DATABASE.NAME,
      user:     cnf.DATABASE.USER,
      password: cnf.DATABASE.PSWD,
      port:     cnf.DATABASE.PORT
    },
    migrations: {
      tableName:  cnf.DATABASE.NAME
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: cnf.DATABASE.NAME,
      user:     cnf.DATABASE.USER,
      password: cnf.DATABASE.PSWD,
      port:     cnf.DATABASE.PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName:  cnf.DATABASE.NAME
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: cnf.DATABASE.NAME,
      user:     cnf.DATABASE.USER,
      password: cnf.DATABASE.PSWD,
      port:     cnf.DATABASE.PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName:  cnf.DATABASE.NAME
    }
  }

};
