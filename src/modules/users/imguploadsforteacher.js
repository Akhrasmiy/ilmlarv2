const db = require("../../db/db.js");
const FormData = require("form-data");
const axios = require("axios");

exports.uploadTeacherImageService = async (idx,file) => {
    const formData = new FormData();
    formData.append('file', file.data, file.name);
    const response = await  axios.post('https://api.ilmlar.com/img-docs', formData, {
        headers: formData.getHeaders()
      });

  const video = await db("users").where({ id: idx }).update({
    profile_img: response.data,
  });
  return response.data; // Return the updated video record

};