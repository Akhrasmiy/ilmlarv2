exports.up = function (knex) {
    return knex.schema.createTable('course_score', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
        table.integer('course_id').unsigned().notNullable().references('id').inTable('courses');
        table.integer('score').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('course_score');
};
