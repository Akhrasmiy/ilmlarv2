
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
async function docsuploads(file) {
  try {
    const formData = new FormData();
    formData.append('file', file.data, file.name);
    try {
      const response = await axios.post('https://save.ilmlar.com/pdf-docs', formData, {
        headers: formData.getHeaders()
      });
      console.log(response.data)
      image = response.data; // Assuming your service returns a URL in the response
      return image;
    } catch (err) {
      console.error('Error sending file to service:', err);
      throw new Error("Obloshka (cover image) not upload.");
    }
  } catch (error) {
    console.error('img upload error:', error);
    throw new Error('Video upload to Vimeo failed.');
  }
}

module.exports = { docsuploads }