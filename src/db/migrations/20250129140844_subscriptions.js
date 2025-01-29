module.exports = {
    up: function(knex) {
      return knex.schema.createTable('subscriptions', function(table) {
        table.increments('id').primary();
        table.integer('teacher_id').unsigned().notNullable();
        table.integer('student_id').unsigned().notNullable();
        table.unique(['teacher_id', 'student_id']);
        table.foreign('teacher_id').references('id').inTable('users').onDelete('CASCADE');
        table.foreign('student_id').references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true);
      });
    },
  
    down: function(knex) {
      return knex.schema.dropTableIfExists('subscriptions');
    }
  };