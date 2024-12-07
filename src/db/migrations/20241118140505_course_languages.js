exports.up = function (knex) {
    return knex.schema.createTable('course_languages', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('course_languages');
};
