const { NotFoundError } = require('../../shared/errors');
const db = require("../../db/db.js"); // Knex konfiguratsiyasi import qilinadi
const { imguploads } = require('../../shared/uploads/imgupload.js');

const editProfileImage = async (id, file) => {
  // Check if the user exists
  const user = await db("users").where("id", id).first();
  if (!user) {
    throw new NotFoundError("Foydalanuvchi topilmadi.");
  }

  // Upload the new profile image
  const profileImgUrl = await imguploads(file);

  // Update the user's profile image in the database
  await db("users").where("id", id).update({
    profile_img: profileImgUrl,
  });

  // Return updated user details (optional)
  return {
    ...user,
    profile_img: profileImgUrl,
  };
};


module.exports = editProfileImage;
