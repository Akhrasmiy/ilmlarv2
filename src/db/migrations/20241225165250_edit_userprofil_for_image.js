exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("profile_img").nullable(); // Yangi profile_img ustuni qo'shiladi
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("profile_img"); // Rollback qilish uchun profile_img ustuni o'chiriladi
  });
};
