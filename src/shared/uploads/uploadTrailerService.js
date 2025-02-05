const axios = require("axios");
const tus = require('tus-js-client');

const VIMEO_ACCESS_TOKEN = "2ac395a2694246448051ee01faf135ce";

async function uploadTrailerToVimeo(file) {
  try {
    // Step 1: Initiate the upload with Vimeo
    const initiateResponse = await axios.post(
      'https://api.vimeo.com/me/videos',
      {
        upload: {
          approach: 'tus',
          size: file.size, // File size in bytes
        },
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
        endpoint: uploadLink,
        headers: {
          Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
        },
        onError: (error) => {
          console.error('Failed to upload video to Vimeo:', error);
          reject(new Error('Video upload to Vimeo failed.'));
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(`Upload progress: ${percentage}%`);
        },
        onSuccess: async () => {
          console.log('File uploaded successfully.');

          // Set video privacy settings to disable download and restrict embedding
          try {
            await axios.patch(
              `https://api.vimeo.com${videoUri}`,
              {
                privacy: {
                  download: false, // Disable download
                  embed: {
                    buttons: {
                      embed: false, // Disable embed button
                    },
                    logos: {
                      vimeo: false, // Disable Vimeo logo
                    },
                    whitelist: ["ilmlar.com"], // Allow embedding only on ilmlar.com
                  },
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            console.log('Video privacy settings updated successfully.');
            resolve(`https://vimeo.com${videoUri}`);
          } catch (error) {
            console.error('Failed to set video privacy settings:', error);
            reject(new Error('Failed to set video privacy settings.'));
          }
        },
      });

      upload.start();
    });
  } catch (error) {
    console.error('Failed to initiate video upload to Vimeo:', error.response?.data || error.message);
    throw new Error('Video upload to Vimeo failed.');
  }
}

module.exports = { uploadTrailerToVimeo };