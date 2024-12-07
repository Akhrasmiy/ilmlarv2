exports.up = function (knex) {
    return knex.schema.createTable('course_commit', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
        table.integer('course_id').unsigned().notNullable().references('id').inTable('courses');
        table.string('txt').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('course_commit');
};
