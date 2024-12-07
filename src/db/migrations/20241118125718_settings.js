exports.up = function (knex) {
    return knex.schema.createTable('settings', (table) => {
        table.increments('id').primary();
        table.float('percent').notNullable();
        table.timestamp('start_date').notNullable();
        table.timestamp('end_date').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('settings');
};
