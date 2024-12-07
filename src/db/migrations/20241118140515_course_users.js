exports.up = function (knex) {
    return knex.schema.createTable('course_users', (table) => {
        table.increments('id').primary();
        table.integer('course_id').unsigned().notNullable().references('id').inTable('courses');
        table.integer('status').unsigned().notNullable().references('id').inTable('course_buy_status');
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
       table.timestamp('start_date').defaultTo(knex.fn.now());
        table.timestamp('end_date').defaultTo(null);
 });
};

exports.down = function (knex) {
    return knex.schema.dropTable('course_users');
};
