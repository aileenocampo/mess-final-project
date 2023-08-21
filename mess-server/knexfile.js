// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// Update with your config settings.
const connectionString = process.env.DATABASE_URL;

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://username:password@localhost:5432/messdb'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'messdb',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      connectionString: connectionString || 'postgres://username:password@localhost:5432/messdb',  // The fallback is useful in case the environment variable isn't set.
      ssl: {
        rejectUnauthorized: false
      },
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
    },
  }

};
