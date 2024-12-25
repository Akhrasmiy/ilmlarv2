exports.up = function (knex) {
    return knex.schema.table("teacher_more_date", (table) => {
      table.string("phone").nullable(); // Yangi profile_img ustuni qo'shiladi
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table("teacher_more_date", (table) => {
      table.dropColumn("phone"); // Rollback qilish uchun profile_img ustuni o'chiriladi
    });
  };
  