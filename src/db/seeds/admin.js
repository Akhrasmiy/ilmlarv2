const  bcrypt  = require("bcryptjs");

exports.seed = async function (knex) {
    await knex('type').where('id', 3).del();
  // type jadvaliga yozuvlar qo'shish
  await knex("type").insert([{ id: 3, name: "admin" }]);
  const types = await knex("type");
  console.log(types);
  // Hash the password for the admin user
  const hashedPassword = await bcrypt.hash("jahongiradmin", 10); // Replace "admin123" with your desired password

  // Add an admin user to the users table
  await knex("users").insert([
    {
      // Make sure this ID doesn't conflict
      first_name: "Admin",
      last_name: "User",
      user_name: "adminchak",
      password: hashedPassword, // Store the hashed password
      email: "admin@example.com",
      is_verified: true,
      type: 3, // Reference to 'admin' type
    },
  ]);
};
