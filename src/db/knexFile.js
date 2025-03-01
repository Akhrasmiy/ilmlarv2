module.exports= {
  development: {
      client: "pg",
      connection: {
          connectionString: process.env.DB_URL,
          ssl: { rejectUnauthorized: false },
      },
      pool: { min: 0, max: 7 },
  },
  qa: {
      client: "pg",
      connection: {
          connectionString: process.env.DB_URL,
          ssl: { rejectUnauthorized: false },
      },
      pool: { min: 0, max: 7 },
  },
  production: {
      client: "pg",
      connection: {
          connectionString: process.env.DB_URL,
          ssl: { rejectUnauthorized: false },
      },
      pool: { min: 0, max: 7 },
  },
};
