exports.up = function (knex) {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.float('debit').notNullable();
        table.float('credit').notNullable();
        table.integer('user_id').unsigned().nullable().references('id').inTable('users');
        table.string('comment');
        table.boolean('is_internal').defaultTo(true); // True for internal, false for external
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('transactions');
};
