exports.up = function (knex) {
    return knex.schema.createTable('teacher_more_date', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
        table.integer('status').unsigned().notNullable().references('id').inTable('teacher_status');
        table.string('spiceal');
        table.string('link');
        table.string('info');
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable('teacher_more_date');
};
