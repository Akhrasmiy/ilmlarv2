exports.seed = async function (knex) {
  // Avval barcha jadval yozuvlarini o'chirish
  await knex('course_buy_status').del();
  await knex('teacher_status').del();
  await knex('type').del();

  // course_buy_status jadvaliga yozuvlar qo'shish
  await knex('course_buy_status').insert([
    { id: 1, name: 'actual' },
    { id: 2, name: 'ended' },
  ]);

  // teacher_status jadvaliga yozuvlar qo'shish
  await knex('teacher_status').insert([
    { id: 1, name: 'new' },
    { id: 2, name: 'active' },
    { id: 3, name: 'block' },
  ]);

  // type jadvaliga yozuvlar qo'shish
  await knex('type').insert([
    { id: 1, name: 'teacher' },
    { id: 2, name: 'student' },
  ]);
};
