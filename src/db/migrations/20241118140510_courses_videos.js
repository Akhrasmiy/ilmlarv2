exports.up = function (knex) {
    return knex.schema.createTable('courses_videos', (table) => {
        table.increments('id').primary();
        table.integer('course_id').unsigned().notNullable().references('id').inTable('courses');
        table.string('title').notNullable();
        table.string('description');
        table.string('video_link').notNullable();
        table.boolean('is_free').defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('courses_videos');
};
