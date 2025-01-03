/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('own_transaction', (table) => {
      table.increments('id').primary();
      table.float('total').notNullable().defaultTo(0); // Umumiy balans
      table.float('credit').notNullable().defaultTo(0); // Kirim(b)
      table.float('provider_fee').notNullable().defaultTo(0); // Click ulushi
      table.float('tax_it_park').notNullable().defaultTo(0); // IT Park ulushi
      table.float('tax_gov').notNullable().defaultTo(0); // Soliqlar
      table.float('profit').notNullable().defaultTo(0); // Foyda
      table.float('others').notNullable().defaultTo(0); // Balansni tenglash
      table.timestamps(true, true); 
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('own_transaction');
  };
  