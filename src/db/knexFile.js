module.exports= {
  development: {
      client: "pg",
      connection: {
          connectionString: `postgresql://doadmin:AVNS_Z2VdRoO9s9gF-sRixWH@databaseilmlaroauth2-do-user-14137897-0.e.db.ondigitalocean.com:25060/defaultdb`,
          ssl: { rejectUnauthorized: false },
      },
      pool: { min: 0, max: 7 },
  },
  qa: {
      client: "pg",
      connection: {
          connectionString: `postgresql://doadmin:AVNS_Z2VdRoO9s9gF-sRixWH@databaseilmlaroauth2-do-user-14137897-0.e.db.ondigitalocean.com:25060/defaultdb`,
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
