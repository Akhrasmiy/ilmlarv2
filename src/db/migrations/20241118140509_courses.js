exports.up = function (knex) {
    return knex.schema.createTable('courses', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('discription').notNullable();
      table.string('trieler');
      table.string('obloshka').notNullable();
      table.integer('teacher_id').unsigned().references('id').inTable('users');
      table.integer('category').unsigned().references('id').inTable('category');
      table.integer('period').unsigned().references('id').inTable('periods');
      table.integer('language').unsigned().references('id').inTable('course_languages');
      table.boolean('is_verified').defaultTo(false);
      table.float('price').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('courses');
  };
  