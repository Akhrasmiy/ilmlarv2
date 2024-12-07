exports.seed = async function (knex) {
  // Avval barcha jadval yozuvlarini o'chirish
  await knex('course_languages').del();
  await knex('periods').del();

  // course_languages jadvaliga yozuvlar qo'shish
  await knex('course_languages').insert([
    { id: 1, name: 'Uzbek' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Russian' },
  ]);

  // periods jadvaliga yozuvlar qo'shish
  await knex('periods').insert([
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
    { id: 5, name: 5 },
    { id: 6, name: 6 },
    { id: 7, name: 7 },
    { id: 8, name: 8 },
    { id: 9, name: 9 },
    { id: 10, name: 10 },
    { id: 11, name: 11 },
    { id: 12, name: 12 },
    { id: 13, name: null },])
};
