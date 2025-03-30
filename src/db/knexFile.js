module.exports = {
    development: {
        client: "pg",
        connection: {
            connectionString: `postgresql://doadmin:AVNS_oy-cltQdJYqCIBYQ83U@db-postgresql-sfo2-46363-do-user-19209666-0.g.db.ondigitalocean.com:25060/defaultdb`,
            ssl: { rejectUnauthorized: false },
        },
        pool: { min: 0, max: 7 },
    },
    qa: {
        client: "pg",
        connection: {
            connectionString: `postgresql://doadmin:AVNS_oy-cltQdJYqCIBYQ83U@db-postgresql-sfo2-46363-do-user-19209666-0.g.db.ondigitalocean.com:25060/defaultdb`,
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