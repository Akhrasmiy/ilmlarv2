exports.up = function (knex) {
    return knex.schema.createTable('course_buy_status', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('course_buy_status');
};
