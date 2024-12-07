exports.up = function (knex) {
    return knex.schema.createTable('save_courses', (table) => {
        table.increments('id').primary();
        table.integer('course_id').unsigned().notNullable().references('id').inTable('courses');
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
       table.timestamp('created_date').defaultTo(knex.fn.now());
 });
};

exports.down = function (knex) {
    return knex.schema.dropTable('save_courses');
};
