exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('user_name').notNullable().unique();
        table.string('password').notNullable();
        table.string('middle_name');
        table.string('email').notNullable().unique();
        table.boolean('is_verified').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('last_login_at');
        table.integer('type').unsigned().references('id').inTable('type');
        table.integer('payment_id').unsigned();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
