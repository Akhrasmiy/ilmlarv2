exports.up = function (knex) {
    return knex.schema.createTable('periods', (table) => {
        table.increments('id').primary();
        table.decimal('name', 10, 0).defaultTo(null); // yoki maxsus qiymat
 });
};

exports.down = function (knex) {
    return knex.schema.dropTable('periods');
};
