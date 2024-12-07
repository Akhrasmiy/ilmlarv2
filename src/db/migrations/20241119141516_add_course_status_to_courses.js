exports.up = function (knex) {
    return knex.schema
      .createTable('course_status', (table) => {
        table.increments('id').primary(); // Primary key
        table.string('name').notNullable(); // Status nomi
      })
      .then(() => {
        return knex.schema.table('courses', (table) => {
          table
            .integer('status') // Status ustuni
            .unsigned()
            .references('id')
            .inTable('course_status') // `course_status` jadvalidan
            .defaultTo(1) // Default "active"
            .onDelete('SET NULL'); // Bog'langan status o'chirilsa, NULL bo'ladi
        });
      });
  };
  
  exports.down = function (knex) {
    return knex.schema
      .table('courses', (table) => {
        table.dropColumn('status'); // Status ustunini o'chirish
      })
      .then(() => knex.schema.dropTable('course_status')); // `course_status` jadvalini o'chirish
  };
  