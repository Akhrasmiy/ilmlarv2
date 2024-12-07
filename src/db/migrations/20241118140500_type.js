exports.up = function (knex) {
    return knex.schema.createTable('type', (table) => {
        table.increments('id').primary();
        table.string('name').defaultTo(null); // yoki maxsus qiymat
 });
};

exports.down = function (knex) {
    return knex.schema.dropTable('type');
};
