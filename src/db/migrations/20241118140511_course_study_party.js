exports.up = function (knex) {
    return knex.schema.createTable('course_study_party', (table) => {
        table.increments('id').primary();
        table.integer('course_id').unsigned().notNullable().references('id').inTable('courses');
        table.string('name').defaultTo(null); // yoki maxsus qiymat
 });
};

exports.down = function (knex) {
    return knex.schema.dropTable('course_study_party');
};
