
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const VIMEO_ACCESS_TOKEN = "2ac395a2694246448051ee01faf135ce";
const tus = require('tus-js-client'); 

async function uploadTrailerToVimeo(file) {
  try {
    console.log(file.size);
    // Step 1: Initiate the upload with Vimeo
    const initiateResponse = await axios.post(
      'https://api.vimeo.com/me/videos',
      {
        upload: {
          approach: 'tus',
          size: file.size, // File size in bytes
        },
        privacy: { "download": false }
      },
      {
        headers: {
          Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const uploadLink = initiateResponse.data.upload.upload_link;
    const videoUri = initiateResponse.data.uri; // URI of the uploaded video

    // Step 2: Upload the file using tus-js-client
    return new Promise((resolve, reject) => {
      const upload = new tus.Upload(file.data, {
        uploadUrl: uploadLink,
        endpoint: uploadLink,
        retryDelays: [0, 1000, 3000, 5000],
        metadata: {
          filename: file.name,
          filetype: file.mimetype,
        },
        onError: (error) => {
          console.error('Failed to upload video to Vimeo:', error);
          reject(new Error('Video upload to Vimeo failed.'));
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(`Upload progress: ${percentage}%`);
        },
        onSuccess: () => {
          console.log('File uploaded successfully.');
          resolve(`https://vimeo.com${videoUri}`);
        },
      });

      upload.start();
    });
  } catch (error) {
    console.error('Failed to initiate video upload to Vimeo:', error.response?.data || error.message);
    throw new Error('Video upload to Vimeo failed.');
  }
}

module.exports = { uploadTrailerToVimeo }