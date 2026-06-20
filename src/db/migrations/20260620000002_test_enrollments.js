exports.up = async function (knex) {
    await knex.schema.createTable('test_enrollments', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('course_id').unsigned().notNullable().references('id').inTable('courses').onDelete('CASCADE');
        table.string('note').nullable();
        table.integer('created_by').unsigned().nullable().references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.unique(['user_id', 'course_id']);
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable('test_enrollments');
};
