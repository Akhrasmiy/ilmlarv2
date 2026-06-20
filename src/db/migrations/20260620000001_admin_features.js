exports.up = async function (knex) {
    await knex.schema.table('users', (table) => {
        table.boolean('is_blocked').defaultTo(false);
    });

    await knex.schema.table('courses', (table) => {
        table.text('rejected_reason').nullable();
    });

    await knex.schema.table('teacher_more_date', (table) => {
        table.text('rejected_reason').nullable();
    });
};

exports.down = async function (knex) {
    await knex.schema.table('teacher_more_date', (table) => {
        table.dropColumn('rejected_reason');
    });

    await knex.schema.table('courses', (table) => {
        table.dropColumn('rejected_reason');
    });

    await knex.schema.table('users', (table) => {
        table.dropColumn('is_blocked');
    });
};
